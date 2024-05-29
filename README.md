��#   P r o g 1 1 4 4 
 
<br>=========================================================================
<br> Groupe 4

<br>=========================================================================



<br>Assurer vous de verifier dans le document .env que les information entrez sont les bonnes , vous devriez changer la database par les donnee fournie ci-dessous. Faite sure de entrez votre nom dutilisateur ainsi que votre mot de passe sur SQL Workbench . Utiliser sil vous plait le port 6000 pour notre projet . 


MYSQL_HOST="localhost"
MYSQL_USER="root"
MYSQL_PASSWORD="123"
MYSQL_DATABASE="podcast"
PORT=6000


<br>=========================================================================


Tous les type de requetes fonctionne sur postman , voici comment bien les executer respectivement : 


Pour faire une requete get simple sur un seule podcast avec la methode get:
http://localhost:6000/podcasts/id


==========================================================


Pour faire une requete globale de tous podcast avec la methode get :
http://localhost:6000/podcasts



==========================================================



Pour faire un nouveau podcast avec la methode post : 
{
  "title": "Mon premier podcast",
  "description": "Une description de mon podcast",
  "filename": "mon_premier_podcast.mp3",
  "langue": "français",
  "id_program": 123,
  "id_presentation": 456
}


==========================================================

Pour supprimer avec la methode delete :
http://localhost:6000/podcasts/id


==========================================================

Pour modifier un podcast avec la methode Patch : 
http://localhost:6000/podcasts/1

{
  "title": "Mon premier podcast",
  "description": "Une description de mon podcast",
  "filename": "mon_premier_podcast.mp3",
  "langue": "français",
  "id_program": 123,
  "id_presentation": 456
}
<br>
==========================================================
