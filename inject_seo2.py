import os

pages = {
    'Home.jsx': {'title': 'Accueil', 'desc': 'Découvrez la Ferme Agroécologique des Niayes : pépinière bio, vente de plantes, matériel agricole, formations pratiques et éco-camping au Sénégal.', 'keys': 'ferme agroécologique, Niayes, Sénégal, Mboro, Ngaparou, pépinière, éco-camping'},
    'Nursery.jsx': {'title': 'Pépinière', 'desc': 'Achetez nos plantes aromatiques, médicinales, fruitières et ornementales bio cultivées au Sénégal. Qualité garantie pour vos aménagements verts.', 'keys': 'pépinière bio Sénégal, vente plantes, Moringa, Menthe, agroécologie'},
    'Farms.jsx': {'title': 'Nos Fermes', 'desc': 'Visitez nos fermes agroécologiques à Mboro et Ngaparou. Des espaces dédiés à l’agriculture durable, la permaculture et la biodiversité au Sénégal.', 'keys': 'ferme Mboro, ferme Ngaparou, agriculture durable, permaculture, visite ferme'},
    'Shop.jsx': {'title': 'Boutique & Équipements', 'desc': 'Vente de matériel agricole, engrais organiques, compost, biochar et systèmes d’irrigation pour l’agriculture écologique au Sénégal.', 'keys': 'matériel agricole Sénégal, engrais bio, compost, biochar, irrigation, outillage'},
    'Camping.jsx': {'title': 'Séjours Nature & Camping', 'desc': 'Réservez votre séjour éco-touristique dans nos campings nature. Tentes sahariennes, emplacements sous les eucalyptus et éco-campements.', 'keys': 'camping Sénégal, éco-tourisme, hébergement nature, tente saharienne, Mboro'},
    'Services.jsx': {'title': 'Aménagements & Services', 'desc': 'Services d’aménagement d’espaces verts, paysagisme, création de jardins écologiques et agroforesterie pour particuliers et professionnels.', 'keys': 'aménagement espace vert Sénégal, paysagiste, création jardin, agroforesterie'},
    'Trainings.jsx': {'title': 'Formations Pratiques', 'desc': 'Participez à nos formations en permaculture, gestion de pépinière, greffage et irrigation solaire. Apprenez l’agroécologie.', 'keys': 'formation permaculture Sénégal, formation agricole, greffage, irrigation solaire'},
    'Pisciculture.jsx': {'title': 'Pisciculture & Aquaponie', 'desc': 'Découvrez nos systèmes intégrés de pisciculture et aquaponie. Élevage de poissons et culture de plantes en symbiose.', 'keys': 'pisciculture Sénégal, aquaponie, élevage de poissons, agriculture circulaire'},
    'Apiculture.jsx': {'title': 'Apiculture', 'desc': 'Production de miel bio et services de pollinisation. Découvrez nos ruches écologiques et nos produits de la ruche de haute qualité.', 'keys': 'apiculture Sénégal, miel bio, ruche écologique, pollinisation'},
    'Transformation.jsx': {'title': 'Transformation', 'desc': 'Produits transformés issus de nos fermes : jus naturels, confitures, huiles essentielles et cosmétiques naturels fabriqués au Sénégal.', 'keys': 'produits transformés bio, jus naturels Sénégal, cosmétiques naturels'},
    'Partnership.jsx': {'title': 'Partenariat', 'desc': 'Devenez partenaire de la Ferme Agroécologique des Niayes. Opportunités d’investissement, collaborations B2B et projets durables.', 'keys': 'partenariat agricole, investissement agroécologie, collaboration B2B, RSE Sénégal'}
}

base_dir = 'src/pages'

for file_name, seo in pages.items():
    file_path = os.path.join(base_dir, file_name)
    if not os.path.exists(file_path):
        continue
        
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    if 'import SEO' in content:
        continue
        
    import_idx = content.find('import ')
    if import_idx == -1:
        continue
    end_of_line = content.find('\n', import_idx)
    content = content[:end_of_line+1] + "import SEO from '../components/SEO';\n" + content[end_of_line+1:]
    
    seo_tag = f"<SEO title=\"{seo['title']}\" description=\"{seo['desc']}\" keywords=\"{seo['keys']}\" />"
      
    return_idx = content.find('return (')
    if return_idx == -1:
        return_idx = content.find('return ')
        
    if return_idx != -1:
        first_tag_idx = content.find('<', return_idx + 6)
        if first_tag_idx != -1:
            tag_end = content.find('>', first_tag_idx)
            # Insert the SEO tag right after the wrapper tag
            content = content[:tag_end+1] + '\n      ' + seo_tag + content[tag_end+1:]
            
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f'Updated {file_name}')
