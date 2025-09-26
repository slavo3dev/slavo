export const slugify = (s: any) =>
  s
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")         
    .replace(/[^a-z0-9-]/g, "");  

export const deslugify = (s: string) =>
  s.replace(/-/g, " ").replace(/\s+/g, " ").trim();
