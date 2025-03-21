import { useState } from "react";
import { MainLayout } from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Link2 } from "lucide-react";
import { DownloadIcon } from "lucide-react";
import { z } from "zod";
import { Progress } from "@/components/ui/progress";
import { saveToken } from "@/lib/utils";

// Define types for the API response
interface VideoInfo {
  title: string;
  thumbnail?: {
    height: number;
    url: string;
    width: number;
  };
  source: string;
  formats?: {
    format: string;
    hasAudio: boolean;
    hasVideo: boolean;
    qualityAudio: string;
    qualityVideo: string;
    url: string;
  }[];
}
const { VITE_API_URL } = import.meta.env;

const DownloadPage = () => {
  saveToken();
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [progress, setProgress] = useState(0);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const { toast } = useToast();
  const urlSchema = z.string().url({ message: "URL inválida" });

  const fetchVideoInfo = async (videoUrl: string) => {
    const encodedUrl = encodeURIComponent(videoUrl);
    try {
      const response = await fetch(
        `${VITE_API_URL}/video/info?url=${encodedUrl}&fields=title&fields=formats&fields=thumbnail`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("VIDEO_API_TOKEN")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erro ao buscar informações do vídeo:", error);
      throw error;
    }
  };

  async function downloadFile(videoUrl: string, _filename: string) {
    try {
      const response = await fetch(`${VITE_API_URL}/video/download`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("VIDEO_API_TOKEN")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: videoUrl,
        }),
      });

      if (!response.ok) {
        throw new Error(`Err: ${response.status} ${response.statusText}`);
      }

      const contentLength = response.headers.get("X-Content-Length");
      const totalSize = contentLength ? parseInt(contentLength, 10) : null;

      console.log(
        `All size file: ${
          totalSize ? `${(totalSize / 1024 / 1024).toFixed(2)} MB` : "Unknown"
        }`
      );

      console.log("contentLength", contentLength);

      const reader = response.body.getReader();
      let receivedSize = 0;
      const chunks = [];

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        chunks.push(value);
        receivedSize += value.length;

        if (totalSize) {
          const progress = ((receivedSize / totalSize) * 100).toFixed(2);
          console.log(
            `Progress: ${progress}% (${(receivedSize / 1024 / 1024).toFixed(
              2
            )} MB done)`
          );
          setIsDownloading(true);
          setDownloadProgress(parseFloat(progress));
        } else {
          console.log(
            `Downloading... (${(receivedSize / 1024 / 1024).toFixed(
              2
            )} MB done)`
          );
          setIsDownloading(true);
          setDownloadProgress(receivedSize);
        }
      }

      const blob = new Blob(chunks);
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);

      const contentDisposition = response.headers.get("Content-Disposition");
      let fileName = "download.mp4";

      if (contentDisposition) {
        const match = contentDisposition.match(/filename="(.+)"/);
        if (match && match[1]) {
          fileName = match[1];
        }
      }

      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);

      console.log("✅ Download done!");
      setIsDownloading(false);
    } catch (error) {
      console.error("❌ Err in download file:", error);
      toast({
        title: "Erro",
        description: "Não foi possível baixar o arquivo.",
        variant: "destructive",
      });
    }
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      urlSchema.parse(url);

      setIsLoading(true);
      setProgress(0);
      setVideoInfo(null);

      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 5;
          return newProgress > 90 ? 90 : newProgress;
        });
      }, 200);

      try {
        const info = await fetchVideoInfo(url);
        clearInterval(progressInterval);
        setProgress(100);
        setVideoInfo(info.data);
      } catch (error) {
        clearInterval(progressInterval);
        setProgress(0);
        toast({
          title: "Erro",
          description:
            "Não foi possível obter informações do vídeo. Verifique a URL e tente novamente.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Erro",
          description: "Por favor, insira uma URL válida",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Baixar Vídeo</h1>

        <div className="mb-6 p-6 rounded-lg border bg-card">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="video-url" className="block text-sm font-medium">
                URL do Vídeo
              </label>
              <div className="flex items-center space-x-2">
                <Link2 className="h-5 w-5 text-muted-foreground" />
                <Input
                  id="video-url"
                  type="text"
                  placeholder="https://www.exemplo.com/video"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  disabled={isLoading}
                  className="flex-1"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Cole o link do vídeo que você deseja baixar
              </p>
            </div>

            {isLoading && progress > 0 && (
              <div className="space-y-2">
                <Progress value={progress} className="w-full" />
                <p className="text-sm text-center text-muted-foreground">
                  Obtendo informações do vídeo...
                </p>
              </div>
            )}

            <Button type="submit" className="w-full gap-2" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="animate-spin">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                  </span>
                  Processando...
                </>
              ) : (
                <>
                  <DownloadIcon className="h-5 w-5" />
                  Iniciar Download
                </>
              )}
            </Button>
          </form>
        </div>

        {videoInfo && (
          <div className="mb-6 p-6 rounded-lg border bg-card">
            <h2 className="text-xl font-semibold mb-3">Informações do Vídeo</h2>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/3">
                {videoInfo?.thumbnail && (
                  <img
                    src={videoInfo.thumbnail?.url}
                    alt={videoInfo.title}
                    className="w-full h-auto rounded-md object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                )}

                {isDownloading && downloadProgress > 0 && (
                  <div className="space-y-5 mt-5">
                    <Progress value={downloadProgress} className="w-full" />
                    <span className="animate-pulse">
                      <p className="text-md text-center text-muted-foreground mt-2">
                        Baixando vídeo... {downloadProgress.toFixed(2)}%{" "}
                      </p>
                    </span>
                  </div>
                )}
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-medium mb-2">{videoInfo.title}</h3>

                {videoInfo.formats && videoInfo.formats.length > 0 ? (
                  <div className="space-y-3">
                    <p className="text-sm font-medium">Video e Audio:</p>
                    <div className="grid grid-cols-1 gap-2">
                      {videoInfo.formats
                        .filter((f) => f.hasAudio && f.hasVideo)
                        .map((format, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            className="justify-start text-left"
                            onClick={() =>
                              downloadFile(
                                format.url,
                                `${videoInfo.title || "video"}.${format.format}`
                              )
                            }
                          >
                            <DownloadIcon className="mr-2 h-4 w-4" />
                            <span>
                              Baixar - {format.format.replace("video/", "")} -{" "}
                              {format.qualityVideo}{" "}
                            </span>
                          </Button>
                        ))}
                    </div>

                    <div className="space-y-3">
                      <p className="text-sm font-medium">Apenas áudio:</p>
                      <div className="grid grid-cols-1 gap-2">
                        {videoInfo.formats
                          .filter((f) => f.hasAudio && !f.hasVideo)
                          .map((format, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              className="justify-start text-left"
                              onClick={() =>
                                downloadFile(
                                  format.url,
                                  `${videoInfo.title || "video"}.${
                                    format.format
                                  }`
                                )
                              }
                            >
                              <DownloadIcon className="mr-2 h-4 w-4" />
                              <span>
                                Baixar - {format.format.replace("audio/", "")}{" "}
                              </span>
                            </Button>
                          ))}
                      </div>
                    </div>
                    <div className="space-y-3">
                      <p className="text-sm font-medium">Apenas Video:</p>
                      <div className="grid grid-cols-1 gap-2">
                        {videoInfo.formats
                          .filter((f) => !f.hasAudio && f.hasVideo)
                          .map((format, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              className="justify-start text-left"
                              onClick={() =>
                                downloadFile(
                                  format.url,
                                  `${videoInfo.title || "video"}.${
                                    format.format
                                  }`
                                )
                              }
                            >
                              <DownloadIcon className="mr-2 h-4 w-4" />
                              <span>
                                Baixar - {format.format.replace("video/", "")} -{" "}
                                {format.qualityVideo}{" "}
                              </span>
                            </Button>
                          ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Button
                    className="w-full"
                    onClick={() =>
                      videoInfo.formats?.[0]?.url &&
                      downloadFile(
                        videoInfo.formats[0].url,
                        `${videoInfo.title || "video"}.${
                          videoInfo.formats[0].format
                        }`
                      )
                    }
                  >
                    <DownloadIcon className="mr-2 h-4 w-4" />
                    Baixar Vídeo
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="space-y-6">
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-xl font-semibold mb-3">Como baixar vídeos</h2>
            <ol className="space-y-3 list-decimal ml-5">
              <li>Cole a URL do vídeo que deseja baixar no campo acima</li>
              <li>Clique no botão "Iniciar Download"</li>
              <li>Aguarde o processamento do vídeo</li>
              <li>Escolha o formato desejado para download</li>
            </ol>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-xl font-semibold mb-3">Sites Compatíveis</h2>
            <p className="text-muted-foreground">
              Nossa ferramenta atualmente é compatível apenas para download de
              vídeos do youtube.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DownloadPage;
