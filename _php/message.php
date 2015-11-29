<span style="color: white; height: 50px">
  THIS IS A DEMO WEBSITE FOR THE PURPOSE OF TESTING HTTP/1.1 AND HTTP/2 PERFORMANCE.<br />
  Fake slow server response:
    <a href="<?php echo BASE_URL; ?>?slowresponse=5000000">5s</a>,
    <a href="<?php echo BASE_URL; ?>?slowresponse=2000000">2s</a>,
    <a href="<?php echo BASE_URL; ?>?slowresponse=1000000">1s</a>,
    <a href="<?php echo BASE_URL; ?>?slowresponse=500000">500ms</a>,
    <a href="<?php echo BASE_URL; ?>?slowresponse=250000">250ms</a>,
    <a href="<?php echo BASE_URL; ?>?slowresponse=50000">50ms</a>,
    <a href="<?php echo BASE_URL; ?>?slowresponse=0">no delay</a>.
  Want to simulate a slow network connection? Use <a href="https://ma.ttias.be/simulate-low-bandwidth-conditions-with-chromes-network-throttling/" target="_blank">Chrome's built-in network throttling</a>.
</span>
