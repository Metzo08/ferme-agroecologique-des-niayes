const fs = require('fs');
const path = require('path');

function getFiles(dir, files = []) {
  const fileList = fs.readdirSync(dir);
  for (const file of fileList) {
    const name = dir + '/' + file;
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files);
    } else if (name.endsWith('.jsx') || name.endsWith('.css')) {
      files.push(name);
    }
  }
  return files;
}

const files = getFiles('src');
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  
  // Supprimer text-transform uppercase
  content = content.replace(/text-transform:\s*uppercase;?/gi, '');
  content = content.replace(/textTransform:\s*['"]uppercase['"],?\s*/gi, '');
  
  // Remplacer les majuscules par des minuscules sauf la première lettre (Sentence case)
  content = content.replace(/>Nos Racines</g, '>Nos racines<');
  content = content.replace(/>Partage de Savoirs</g, '>Partage de savoirs<');
  content = content.replace(/>Végétalisation & Biodiversité</g, '>Végétalisation & biodiversité<');
  content = content.replace(/>Agroécologie & Écotourisme au Sénégal</g, '>Agroécologie & écotourisme au Sénégal<');
  content = content.replace(/>Formations Pratiques</g, '>Formations pratiques<');
  content = content.replace(/>Site Touristique & Aménagements</g, '>Site touristique & aménagements<');
  content = content.replace(/>Site Principal & Production</g, '>Site principal & production<');
  content = content.replace(/>Nos Fermes Agroécologiques</g, '>Nos fermes agroécologiques<');
  content = content.replace(/>Pépinière Agroécologique</g, '>Pépinière agroécologique<');
  content = content.replace(/>Eco-Camping</g, '>Eco-camping<');
  content = content.replace(/>Espaces Verts</g, '>Espaces verts<');
  content = content.replace(/>Deux Terroirs, Une Vision</g, '>Deux terroirs, une vision<');
  content = content.replace(/>Nos Domaines d'Expertise</g, ">Nos domaines d'expertise<");
  content = content.replace(/>Pépinière & Boutique</g, ">Pépinière & boutique<");
  content = content.replace(/>Catalogue Pépinière</g, ">Catalogue pépinière<");
  content = content.replace(/>Réservation Camping</g, ">Réservation camping<");
  content = content.replace(/>Aménagement & Devis</g, ">Aménagement & devis<");
  content = content.replace(/>Boutique Agricole</g, ">Boutique agricole<");
  content = content.replace(/>Panier d'Achats</g, ">Panier d'achats<");
  content = content.replace(/>Tableau de Bord Administrateur</g, ">Tableau de bord administrateur<");
  content = content.replace(/>Découvrir Mboro</g, ">Découvrir Mboro<"); // already fine but just in case
  
  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log('Updated', file);
  }
}
