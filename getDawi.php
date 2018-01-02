<?php
//get Infos
header("Content-Type: text/plain; charset=utf-8");
//header("HTTP/1.0 200 OK");
 
// ini_set('display.errors',1);
// error_reporting(-1);//E_ALL

$ip="192.168.0.9";	//ip 
$port=51115;		//port

$fp = fsockopen($ip,$port , $errno, $errstr, 60); 
if (!$fp) {
    echo "<error>$errstr ($errno)</error>";
} else {
    $out = "GET / HTTP/1.1\r\n";
    $out .= "Host: myraspi\r\n";
    $out .= "Connection: Close\r\n\r\n";
    fwrite($fp, $out);	//Stream öffnen
    while (!feof($fp)) {
        $data=fgets($fp, 128);
		echo $data;
		if(stripos ( $data,"</SVConfigCmd>")===0) break; //wen Blockende Stream abbrechen
    }
    fclose($fp);
}	
?>