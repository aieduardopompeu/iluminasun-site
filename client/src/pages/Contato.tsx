import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Contato() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    averageBill: "",
    propertyType: "" as "residencial" | "comercial" | "industrial" | "rural" | "",
    message: "",
  });

  const createLead = trpc.leads.create.useMutation({
    onSuccess: () => {
      toast.success("Mensagem enviada com sucesso! Entraremos em contato em breve.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        city: "",
        state: "",
        averageBill: "",
        propertyType: "",
        message: "",
      });
    },
    onError: (error) => {
      toast.error(`Erro ao enviar mensagem: ${error.message}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      toast.error("Por favor, preencha os campos obrigatórios.");
      return;
    }

    createLead.mutate({
      name: formData.name,
      email: formData.email,
      phone: formData.phone || undefined,
      city: formData.city || undefined,
      state: formData.state || undefined,
      averageBill: formData.averageBill || undefined,
      propertyType: formData.propertyType || undefined,
      message: formData.message || undefined,
    });
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold">Entre em Contato</h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Estamos prontos para atender você e esclarecer todas as suas dúvidas sobre energia solar
            </p>
          </div>
        </div>
      </section>

      {/* Contato e Formulário */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Informações de Contato */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-6">Fale Conosco</h2>
                <p className="text-muted-foreground mb-8">
                  Nossa equipe de especialistas está pronta para ajudar você a encontrar a melhor 
                  solução em energia solar para suas necessidades.
                </p>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                        <Phone className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Telefone / WhatsApp</h3>
                        <a href="tel:+5521966084093" className="text-muted-foreground hover:text-primary transition-colors">(21) 96608-4093</a>
                        <p className="text-sm text-muted-foreground mt-1">
                          Segunda a Sexta, 9h às 18h
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10 flex-shrink-0">
                        <Mail className="h-6 w-6 text-secondary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">E-mail</h3>
                        <a href="mailto:contato@iluminasun.com.br" className="text-muted-foreground hover:text-primary transition-colors">contato@iluminasun.com.br</a>
                        <p className="text-sm text-muted-foreground mt-1">
                          Respondemos em até 24 horas
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Endereço</h3>
                        <p className="text-muted-foreground">
                          R. Visconde de Pirajá, 414<br />
                          Ipanema, Rio de Janeiro - RJ<br />
                          CEP: 22410-002
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="pt-6">
                <h3 className="font-semibold mb-4">Horário de Atendimento</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>Segunda a Sexta: 9h às 18h</p>
                  <p>Sábado: 8h às 14h</p>
                  <p>Domingo: Fechado</p>
                </div>
              </div>
            </div>

            {/* Formulário */}
            <div>
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6">Solicite um Orçamento</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome Completo *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Seu nome completo"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="seu@email.com"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="(XX) XXXXX-XXXX"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">Cidade</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          placeholder="Sua cidade"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">Estado</Label>
                        <Input
                          id="state"
                          value={formData.state}
                          onChange={(e) => setFormData({ ...formData, state: e.target.value.toUpperCase() })}
                          placeholder="SP"
                          maxLength={2}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="averageBill">Valor Médio da Conta de Luz</Label>
                      <Input
                        id="averageBill"
                        value={formData.averageBill}
                        onChange={(e) => setFormData({ ...formData, averageBill: e.target.value })}
                        placeholder="R$ 500,00"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="propertyType">Tipo de Imóvel</Label>
                      <Select
                        value={formData.propertyType}
                        onValueChange={(value: "residencial" | "comercial" | "industrial" | "rural") =>
                          setFormData({ ...formData, propertyType: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="residencial">Residencial</SelectItem>
                          <SelectItem value="comercial">Comercial</SelectItem>
                          <SelectItem value="industrial">Industrial</SelectItem>
                          <SelectItem value="rural">Rural</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Mensagem</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Conte-nos mais sobre seu projeto..."
                        rows={4}
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full font-semibold"
                      disabled={createLead.isPending}
                    >
                      {createLead.isPending ? "Enviando..." : "Enviar Mensagem"}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      * Campos obrigatórios
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
