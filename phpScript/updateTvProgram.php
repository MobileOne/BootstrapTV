<?php
     $url = "http://xmltv.dyndns.org/download/tnt_lite.zip";
     $name = basename($url);
     if (file_put_contents("temp/$name", file_get_contents($url)))
     { 
          echo "<br/>Download OK";
          unzip_file('temp/tnt_lite.zip', 'temp');
          if (copy ( "temp/tnt_lite.xml" , "../data/tnt_lite.xml" )){
               echo "<br/>Copy OK";
               echo"<br/>Programme TV Updated";

               unlink ( "temp/tnt_lite.xml" );
               unlink ( "temp/tnt_lite.zip" );
               return true;
          }

     }
     else {
          echo "<br/>Download Error ";
          return false;
     }

     function unzip_file($file, $destination) {
          $zip = new ZipArchive();
          if ($zip->open($file) !== true) {
               echo ' Erreur Extraction';
               return false;
          }
          $zip->extractTo($destination);
          $zip->close();
          echo '<br/>Extraction zip OK';
     }
?>