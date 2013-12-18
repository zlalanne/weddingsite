<?php

	$emailTo = "info@mustache.com"; // Enter your email for feedbacks here
	
	$headers = "MIME-Version: 1.0\r\n";
	$headers .= "Content-type: text/html; charset=utf-8\r\n";
	
	$subject = "Contact form message"; // Enter your subject here
	$body = "";

	
	reset($_GET);
	while (list($key, $val) = each($_GET)) {
		$title = ucwords(strtolower($key));
		if( $title == 'user_name'){		
			$body .= "Name: ";
		}elseif( $title == 'user_message'){
			$body .= "Message: ";
		}elseif( $title == 'user_email'){
			$body .= "Mail: ";		
		}
		$body .= $val;
	  	$body .= "\n\n";
	}
	$user_name = isset($_GET['user_name']) ? $_GET['user_name'] : '';
	$user_email = isset($_GET['user_email']) ? $_GET['user_email'] : '';
	$headers = "From: $name <$user_email>\r\nReply-To: $user_email\r\n";	
	  
	$result = mail($emailTo, $subject, $body, $headers);
	echo $result;
	
  ?>