<?php
     $url = "http://kevinpato.free.fr/xmltv/download/tnt_lite.zip";
     $name = basename($url);
     if (file_put_contents("temp/$name", file_get_contents($url)))
     {
          echo "Download OK";
          unzip_file('temp/tnt_lite.zip', 'temp');
          if (copy ( "temp/tnt_lite.xml" , "../data/tnt_lite.xml" )){
               echo " - Copy OK<br/>Programme TV Updated";
          }

     }
     else {
          echo "Download Error ";
     }

     function unzip_file($file, $destination) {
          $zip = new ZipArchive();
          if ($zip->open($file) !== true) {
               return ' Erreur Extraction';
          }
          $zip->extractTo($destination);
          $zip->close();
          echo ' - Archive extrait';
     }
?>