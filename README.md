
 
=========================================================================
<br> Groupe 4 <br>
=========================================================================<br>



<br>Assurer vous de verifier dans le document .env que les information entrez sont les bonnes , vous devriez changer la database par les donnee fournie ci-dessous. Faite sure de entrez votre nom dutilisateur ainsi que votre mot de passe sur SQL Workbench .<br> Utiliser sil vous plait le port 6000 pour notre projet . <br>


MYSQL_HOST="localhost"<br>
MYSQL_USER="root"<br>
MYSQL_PASSWORD="123"<br>
MYSQL_DATABASE="podcast"<br>
PORT=6000<br>


=========================================================================<br>


Tous les type de requetes fonctionne sur postman , voici comment bien les executer respectivement :<br>


Pour faire une requete get simple sur un seule podcast avec la methode get:<br>
http://localhost:6000/podcasts/id<br>


==========================================================<br>


Pour faire une requete globale de tous podcast avec la methode get :<br>
http://localhost:6000/podcasts<br>



==========================================================<br>



Pour faire un nouveau podcast avec la methode post : <br>
{<br>
  "title": "Mon premier podcast",<br>
  "description": "Une description de mon podcast",<br>
  "filename": "mon_premier_podcast.mp3",<br>
  "langue": "français",<br>
  "id_program": 123,<br>
  "id_presentation": 456<br>
}


==========================================================<br>

Pour supprimer avec la methode delete :<br>
http://localhost:6000/podcasts/id<br>


==========================================================<br>

Pour modifier un podcast avec la methode Patch : <br>
http://localhost:6000/podcasts/1<br>

{<br>
  "title": "Mon premier podcast",<br>
  "description": "Une description de mon podcast",<br>
  "filename": "mon_premier_podcast.mp3",<br>
  "langue": "français",<br>
  "id_program": 123,<br>
  "id_presentation": 456<br>
}<br>

==========================================================<br>
