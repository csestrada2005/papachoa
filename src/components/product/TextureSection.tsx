const TextureSection = () => {
  return (
    <div className="max-w-3xl">
      <div className="flex flex-col sm:flex-row items-stretch gap-4 bg-card rounded-xl p-5 md:p-6 border border-border/30">
        {/* Texture swatch */}
        <div className="w-full sm:w-28 h-20 sm:h-auto bg-papachoa-cream rounded-lg flex items-center justify-center shrink-0 border border-border/20">
          {/* Embroidery stitch icon */}
          <svg className="w-8 h-8 text-primary/50" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3">
            <path d="M8 16C8 12 12 8 16 8C20 8 24 12 24 16C24 20 20 24 16 24C12 24 8 20 8 16Z" />
            <path d="M12 12L20 20" />
            <path d="M20 12L12 20" />
          </svg>
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
