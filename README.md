# Compare HTTP/1.1 vs HTTP/2 loading times

This project was created for the purpose of testing a "real" website with HTTP/2.

A couple of requirements:

- Your browser needs to support HTTP/2 (recent Chrome, Firefox)
- You need to accept the self-signed SSL certificate (ignore the error in your browser)

For the purpose of this demo I copied the layout of [our company site](https://www.nucleus.be/en/) and removed all images with placeholders. The same CSS, Javascript and files are all being used.

This should give a better representation of a "real" site in HTTP/2, instead of artificial tests that will always favor HTTP/2 like [http2demo.io](http://www.http2demo.io/) or [gophertiles](https://http2.golang.org/gophertiles).

Since this repository is open for everyone, feel free to send in pull requests with scenario's you'd like to test. I'll happily pull in the changes so you can experience HTTP/1.1 and HTTP/2 on my server.
