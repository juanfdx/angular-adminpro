
export const imageUrl = (base_url: string, image: string, type: string) => {

  if (image) {
    return `${base_url}/upload/${type}/${image}`
  } else {
    return `${base_url}/upload/${type}/no-image`;
  }
  
}
