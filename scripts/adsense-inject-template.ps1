$ErrorActionPreference = "Stop"

# --- Detecta automaticamente qual template existe ---
$tplCandidates = @(
  "client\src\pages\blog\posts\PostTemplate.tsx",
  "client\src\pages\blog\posts\_PostTemplate.tsx"
)

$templatePath = $tplCandidates | Where-Object { Test-Path $_ } | Select-Object -First 1
if (-not $templatePath) {
  throw "Não encontrei PostTemplate.tsx nem _PostTemplate.tsx em client\src\pages\blog\posts\."
}

Write-Host "Template alvo: $templatePath"

$raw = Get-Content -Raw -Encoding UTF8 $templatePath
$orig = $raw

function Backup-File([string]$path) {
  $stamp = Get-Date -Format "yyyyMMdd-HHmmss"
  $bak = "$path.bak-$stamp"
  Copy-Item -LiteralPath $path -Destination $bak -Force
  return $bak
}

# --- Imports: AdSenseAd + config ---
if ($raw -notmatch 'AdSenseAd') {
  $importBlock = @"
import AdSenseAd from "@/components/ads/AdSenseAd";
import { ADSENSE_CLIENT, ADSENSE_SLOTS } from "@/config/adsense";
"@

  # insere após o último import
  $imports = [regex]::Matches($raw, '(?m)^\s*import\s+.*?;\s*$')
  if ($imports.Count -gt 0) {
    $last = $imports[$imports.Count - 1]
    $pos = $last.Index + $last.Length
    $raw = $raw.Insert($pos, "`r`n$importBlock")
  } else {
    $raw = $importBlock + "`r`n" + $raw
  }
}

# --- refreshKey: POST_SLUG (preferencial), senão slug ---
$refreshKeyExpr = "{POST_SLUG}"
if ($raw -notmatch '(?m)\bPOST_SLUG\b') {
  $refreshKeyExpr = "{slug}"
}

# --- Blocos de anúncio (Topo/Rodapé) ---
$adTop = @"
<AdSenseAd
  client={ADSENSE_CLIENT}
  slot={ADSENSE_SLOTS.BLOG_TOP}
  layout="in-article"
  format="fluid"
  refreshKey=$refreshKeyExpr
  adTest={import.meta.env.DEV}
  className="my-8"
  style={{ textAlign: "center" }}
/>
"@

$adBottom = @"
<AdSenseAd
  client={ADSENSE_CLIENT}
  slot={ADSENSE_SLOTS.BLOG_BOTTOM}
  format="auto"
  fullWidthResponsive
  refreshKey=$refreshKeyExpr
  adTest={import.meta.env.DEV}
  className="my-10"
/>
"@

# --- Injeta TOP: logo após o primeiro <ShareBar ... />
if ($raw -notmatch 'ADSENSE_SLOTS\.BLOG_TOP') {
  $raw = [regex]::Replace(
    $raw,
    '(?s)(<ShareBar\b.*?\/>)',
    "`$1`r`n$adTop",
    1
  )
}

# --- Injeta BOTTOM: antes do fechamento do article/main (fallback)
if ($raw -notmatch 'ADSENSE_SLOTS\.BLOG_BOTTOM') {
  if ($raw -match '(?s)</article>') {
    $raw = [regex]::Replace($raw, '(?s)</article>', "$adBottom`r`n</article>", 1)
  } elseif ($raw -match '(?s)</main>') {
    $raw = [regex]::Replace($raw, '(?s)</main>', "$adBottom`r`n</main>", 1)
  } else {
    # fallback: coloca no final
    $raw = $raw + "`r`n$adBottom`r`n"
  }
}

if ($raw -ne $orig) {
  $bak = Backup-File $templatePath
  Set-Content -LiteralPath $templatePath -Value $raw -Encoding UTF8 -NoNewline
  Write-Host "OK. Template atualizado. Backup: $bak"
} else {
  Write-Host "Nada a alterar (já estava aplicado)."
}
