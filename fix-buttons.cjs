const fs = require('fs');
const path = require('path');

function getFiles(dir, files = []) {
  const fileList = fs.readdirSync(dir);
  for (const file of fileList) {
    const name = dir + '/' + file;
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files);
    } else if (name.endsWith('.jsx')) {
      files.push(name);
    }
  }
  return files;
}

const files = getFiles('src');
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  
  content = content.replace(/>Visiter la Pépinière</g, '>Visiter la pépinière<');
  content = content.replace(/>Réserver un Camping</g, '>Réserver un camping<');
  content = content.replace(/>Continuer mes Achats</g, '>Continuer mes achats<');
  content = content.replace(/>Procéder au Paiement</g, '>Procéder au paiement<');
  content = content.replace(/>Vider le Panier</g, '>Vider le panier<');
  content = content.replace(/>Demander un Devis</g, '>Demander un devis<');
  content = content.replace(/>Envoyer ma Demande</g, '>Envoyer ma demande<');
  content = content.replace(/>Voir les Offres</g, '>Voir les offres<');
  content = content.replace(/>S'Inscrire</g, ">S'inscrire<");
  content = content.replace(/>Payer l'Inscription</g, ">Payer l'inscription<");
  content = content.replace(/>Réinitialiser les Filtres</g, ">Réinitialiser les filtres<");
  content = content.replace(/>Passer la Commande</g, ">Passer la commande<");
  
  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log('Updated', file);
  }
}
