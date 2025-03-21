
import { MainLayout } from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Download, Video } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
            OxeVideo
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-muted-foreground">
            Baixe seus vídeos favoritos com facilidade e rapidez. Uma maneira simples de salvar conteúdo para assistir offline.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Button 
              size="lg" 
              onClick={() => navigate("/download")}
              className="gap-2"
            >
              <Download className="h-5 w-5" />
              Baixe seu vídeo agora
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="flex flex-col items-center p-6 rounded-lg border bg-card">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Video className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fácil de Usar</h3>
              <p className="text-muted-foreground text-center">
                Simplesmente cole o link do vídeo e comece o download com um clique.
              </p>
            </div>
            
            <div className="flex flex-col items-center p-6 rounded-lg border bg-card">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Download className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Download Rápido</h3>
              <p className="text-muted-foreground text-center">
                Velocidade otimizada para baixar seus vídeos no menor tempo possível.
              </p>
            </div>
            
            <div className="flex flex-col items-center p-6 rounded-lg border bg-card">
              <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <Video className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Sem Registros</h3>
              <p className="text-muted-foreground text-center">
                Não é necessário criar uma conta para usar nosso serviço.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
