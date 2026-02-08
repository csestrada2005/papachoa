// Papachoa México - Single source of truth for brand contact & social data
// Edit this file to update contact information across the entire site

export const brand = {
  name: "Papachoa México",
  
  socials: {
    instagramUrl: "https://www.instagram.com/papachoamexico/",
    facebookUrl: "https://www.facebook.com/papachoamexico",
  },
  
  contact: {
    email: "papachoamexico@gmail.com",
    phoneDisplay: "222 299 4466",
    whatsappE164: "5212222994466",
    whatsappDisplay: "222 299 4466",
    messengerUrl: "https://m.me/papachoamexico",
  },
  
  // Pre-built URLs for convenience
  get whatsappUrl() {
    const message = encodeURIComponent("Hola Papachoa 😊 Me gustaría recibir ayuda con mi compra.");
    return `https://wa.me/${this.contact.whatsappE164}?text=${message}`;
  },
  
  get emailUrl() {
    return `mailto:${this.contact.email}?subject=${encodeURIComponent("Contacto Papachoa")}`;
  },
} as const;

export type Brand = typeof brand;
