import texturaTela from "@/assets/textura-tela.png";

interface TextureSectionProps {
  image?: string;
}

const TextureSection = ({ image }: TextureSectionProps) => {
  return (
    <div className="max-w-3xl">
      <div className="flex flex-col sm:flex-row items-stretch gap-4 bg-card rounded-xl p-5 md:p-6 border border-border/30">
        {/* Texture swatch */}
        <div className="w-full sm:w-28 h-[160px] sm:h-auto shrink-0 overflow-hidden rounded-lg">
          <img
            src={image || texturaTela}
            alt="Close-up de textura de tela ultra suave"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        {/* Copy */}
        <div className="flex flex-col justify-center gap-1">
          <h3 className="font-display text-lg text-foreground">
            Textura que se siente hogar
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed font-light">
            Suave al tacto, pensada para abrazar sin apretar. Cada prenda pasa por un proceso de acabado que garantiza esa sensación desde el primer contacto.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TextureSection;
