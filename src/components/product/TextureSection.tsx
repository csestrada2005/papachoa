const TextureSection = () => {
  return (
    <div className="max-w-3xl">
      <div className="flex flex-col sm:flex-row items-stretch gap-4 bg-card rounded-3xl p-5 md:p-6 shadow-sm border border-border/30">
        {/* Texture swatch placeholder */}
        <div className="w-full sm:w-28 h-20 sm:h-auto bg-papachoa-cream rounded-2xl flex items-center justify-center shrink-0">
          <span className="text-3xl">🧶</span>
        </div>
        {/* Copy */}
        <div className="flex flex-col justify-center gap-1">
          <h3 className="font-display text-lg text-foreground">
            Textura que se siente hogar
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Suave al tacto, pensada para abrazar sin apretar. Cada prenda pasa por un proceso de acabado que garantiza esa sensación de "quiero quedarme aquí" desde el primer contacto.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TextureSection;
