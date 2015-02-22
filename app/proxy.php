<?php
session_start();
class Curl {
    /**
     * @param $url
     * @param $params
     * @return mixed
     *
     * SIMPLE cURL Post
     *
     * This function posts a 1-deep array to an endpoint.
     *
     */

    public function curl_post_simple($url, array $params)
    {   
        $fields_string = "";
        foreach($params as $key=>$value) {

            $fields_string .= $key.'='.$value.'&';
        }

        // Lop off the RHS ampersand
        $fields_string = substr($fields_string, 0, -1);

        // create curl resource
        $ch = curl_init();

        curl_setopt($ch,CURLOPT_POST, count($params));
        curl_setopt($ch,CURLOPT_POSTFIELDS, $fields_string);

        // set url
        curl_setopt($ch, CURLOPT_URL, $url);
        //return the transfer as a string
        curl_setopt($ch,CURLOPT_RETURNTRANSFER, true);

        // $output contains the output string
        $output = curl_exec($ch);
        // close curl resource to free up system resources
        curl_close($ch);
        return $output;
    }
}


$curl  = new Curl();
$reply = "Invalid verb";
if($_POST)
{

    $url = $_POST['csurl'];
    unset($_POST['csurl']);


    $params = $_POST;

    if($_GET)
    {
        unset($_GET);
    }

    $reply = $curl->curl_post_simple($url, $params);

}

echo $reply;
exit;


