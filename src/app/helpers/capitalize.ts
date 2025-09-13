//pone en mayusculas la primera letra de cada palabra del string

export const capitalize = (term: string): string => {

  return term.trim().toLowerCase().replace(/\w\S*/g, 
         (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));

}