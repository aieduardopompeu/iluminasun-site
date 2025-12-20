$ErrorActionPreference = "Stop"

$postsDir = "client\src\pages\blog\posts"

$targets = @(
  @{
    File    = "TendenciasMercadoSolar2026.tsx"
    Slug    = "tendencias-mercado-solar-2026"
    Hero    = "/blog/tendencias-mercado-solar-2026.webp"
    Alt     = "TendÃªncias do mercado solar em 2026: preÃ§os, eficiÃªncia, baterias e regulaÃ§Ã£o."
    Caption = "TendÃªncias 2026: eficiÃªncia, baterias, inversores, regulaÃ§Ã£o e oportunidades no RJ e regiÃ£o."
  },
  @{
    File    = "FinanciamentoEnergiaSolarRJ.tsx"
    Slug    = "financiamento-energia-solar-rj"
    Hero    = "/blog/financiamento-energia-solar-rj.webp"
    Alt     = "Financiamento de energia solar no RJ: parcelas, juros e aprovaÃ§Ã£o."
    Caption = "Financiamento no RJ: documentos, prazos e como acelerar a aprovaÃ§Ã£o."
  },
  @{
    File    = "ContaDeLuzNaoZerou.tsx"
    Slug    = "conta-de-luz-nao-zerou-energia-solar"
    Hero    = "/blog/conta-de-luz-nao-zerou.webp"
    Alt     = "Conta de luz com energia solar: mÃ­nimos, taxas e compensaÃ§Ã£o no RJ."
    Caption = "Conta nÃ£o zerou: custo mÃ­nimo, itens tarifÃ¡rios e regras de compensaÃ§Ã£o â€” RJ e regiÃ£o."
  },
  @{
    File    = "ManutencaoPaineisSolares.tsx"
    Slug    = "manutencao-paineis-solares"
    Hero    = "/blog/manutencao-paineis-solares.webp"
    Alt     = "ManutenÃ§Ã£o de painÃ©is solares: checklist e boas prÃ¡ticas."
    Caption = "ManutenÃ§Ã£o: limpeza, inspeÃ§Ã£o, sombreamento e performance â€” RJ e regiÃ£o."
  },
  @{
    File    = "EnergiaSolarEmpresas.tsx"
    Slug    = "energia-solar-empresas"
    Hero    = "/blog/energia-solar-empresas.webp"
    Alt     = "Energia solar para empresas: como reduzir custos e aumentar competitividade."
    Caption = "Empresas: dimensionamento, demanda, perfil de consumo e payback â€” RJ e regiÃ£o."
  }
)

function Backup-File([string]$path) {
  $stamp = Get-Date -Format "yyyyMMdd-HHmmss"
  $bak = "$path.bak-$stamp"
  Copy-Item -LiteralPath $path -Destination $bak -Force
  return $bak
}

function Escape-TsxString([string]$s) {
  if ($null -eq $s) { return "" }
  return ($s -replace '\\', '\\' -replace '"', '\"')
}

function Ensure-HeroConstants([string]$raw, [string]$hero, [string]$alt, [string]$caption) {
  if ($raw -match '(?m)^\s*const\s+HERO_IMAGE\s*=') { return $raw }

  $altEsc = Escape-TsxString $alt
  $capEsc = Escape-TsxString $caption

  $heroBlock = "`r`n`r`nconst HERO_IMAGE = `"$hero`";`r`n" +
               "const HERO_ALT = `"$altEsc`";`r`n" +
               "const HERO_CAPTION = `"$capEsc`";"

  $importMatches = [regex]::Matches($raw, '(?m)^\s*import\s+.*?;\s*$')
  if ($importMatches.Count -eq 0) { return $raw }

  $last = $importMatches[$importMatches.Count - 1]
  $pos = $last.Index + $last.Length
  return $raw.Insert($pos, $heroBlock)
}

function Ensure-OGImage([string]$raw, [string]$hero) {
  $newLine = 'const OG_IMAGE = `${SITE_URL}' + $hero + '`;'

  if ($raw -match '(?m)^\s*const\s+OG_IMAGE\s*=') {
    return [regex]::Replace(
      $raw,
      '(?m)^(?<indent>\s*)const\s+OG_IMAGE\s*=\s*.*?;\s*$',
      { param($m) $m.Groups["indent"].Value + $newLine },
      1
    )
  }

  # fallback: insere apÃ³s CANONICAL se existir
  if ($raw -match '(?m)^(?<indent>\s*)const\s+CANONICAL\s*=.*?;\s*$') {
    $indent = $Matches["indent"]
    return [regex]::Replace($raw, '(?m)^(?<indent>\s*)const\s+CANONICAL\s*=.*?;\s*$', '$0' + "`r`n$indent$newLine", 1)
  }

  return $raw
}

function Ensure-HeroFigure([string]$raw) {
  if ($raw -match 'src=\{HERO_IMAGE\}') { return $raw }

  $pattern = '(?s)</header>\s*(\r?\n)(?<indent>\s*)<section\s+className="prose'
  if ($raw -notmatch $pattern) { return $raw }

  $indent = $Matches["indent"]

  $figure =
@"
</header>

${indent}{/* Hero image */}
${indent}<figure className="overflow-hidden rounded-2xl border border-border bg-muted/30">
${indent}  <img
${indent}    src={HERO_IMAGE}
${indent}    alt={HERO_ALT}
${indent}    className="h-auto w-full object-cover"
${indent}    loading="lazy"
${indent}  />
${indent}  {HERO_CAPTION ? (
${indent}    <figcaption className="px-4 py-3 text-xs text-muted-foreground">
${indent}      {HERO_CAPTION}
${indent}    </figcaption>
${indent}  ) : null}
${indent}</figure>

${indent}<section className="prose
"@

  return [regex]::Replace($raw, $pattern, $figure, 1)
}

$changed = 0
$skipped = 0

foreach ($t in $targets) {
  $path = Join-Path $postsDir $t.File
  if (-not (Test-Path -LiteralPath $path)) {
    Write-Host "SKIP (nÃ£o achei): $path" -ForegroundColor Yellow
    $skipped++
    continue
  }

  $raw = Get-Content -LiteralPath $path -Raw -Encoding UTF8
  $new = $raw

  $new = Ensure-OGImage $new $t.Hero
  $new = Ensure-HeroConstants $new $t.Hero $t.Alt $t.Caption
  $new = Ensure-HeroFigure $new

  if ($new -ne $raw) {
    $bak = Backup-File $path
    Set-Content -LiteralPath $path -Value $new -Encoding UTF8 -NoNewline
    Write-Host "OK: $($t.File) (backup: $bak)" -ForegroundColor Green
    $changed++
  } else {
    Write-Host "NO-CHANGE: $($t.File)" -ForegroundColor DarkGray
  }
}

Write-Host ""
Write-Host "ConcluÃ­do. Alterados: $changed | NÃ£o encontrados: $skipped" -ForegroundColor Cyan
