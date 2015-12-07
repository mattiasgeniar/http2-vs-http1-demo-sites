<?php
if (php_sapi_name() == 'cli-server') {
	# Dev environment
	define('BASE_URL', 'http://localhost:9000/');
} else {
  # Assume production
  define('BASE_URL', $_SERVER['HTTP_HOST']);
}

# Should we fake a slow server response?
if (isset($_GET['slowresponse'])) {
  $delay = (int) $_GET['slowresponse'];

  if ($delay <= 5000000) {
    # DoS prevention: max delay of 5s
    usleep($delay);
  }
}
?>
