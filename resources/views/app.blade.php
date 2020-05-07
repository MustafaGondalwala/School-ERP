<!DOCTYPE html>
    <html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
        <link rel="icon" href="../../assets/img/brand/favicon.png" type="image/png">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700">
        <link rel="stylesheet" href="../../assets/vendor/nucleo/css/nucleo.css" type="text/css">
        <link rel="stylesheet" href="../../assets/vendor/@fortawesome/fontawesome-free/css/all.min.css" type="text/css">
        <link rel="stylesheet" href="../../assets/css/argon.min5438.css?v=1.2.0" type="text/css">
        <link rel="stylesheet" href="../../assets/vendor/datatables.net-bs4/css/dataTables.bootstrap4.min.css">
        <link rel="stylesheet" href="../../assets/vendor/datatables.net-buttons-bs4/css/buttons.bootstrap4.min.css">
        <link rel="stylesheet" href="../../assets/vendor/datatables.net-select-bs4/css/select.bootstrap4.min.css">
        <script>
          (function(w, d, s, l, i) {
            w[l] = w[l] || [];
            w[l].push({
              'gtm.start': new Date().getTime(),
              event: 'gtm.js'
            });
            var f = d.getElementsByTagName(s)[0],
              j = d.createElement(s),
              dl = l != 'dataLayer' ? '&l=' + l : '';
            j.async = true;
            j.src =
              '../../../../www.googletagmanager.com/gtm5445.html?id=' + i + dl;
            f.parentNode.insertBefore(j, f);
          })(window, document, 'script', 'dataLayer', 'GTM-NKDMSK6');
        </script>

        <title>School System</title>
        <!-- Styles -->
    </head>
    <body >
        <div id="app"></div>
        <script src="{{ asset('js/app.js') }}"></script>
        <script
			  src="https://code.jquery.com/jquery-3.4.1.min.js"
			  integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
			  crossorigin="anonymous"></script>
        <script src="../../assets/vendor/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
        <script src="../../assets/vendor/js-cookie/js.cookie.js"></script>
        <script src="../../assets/vendor/jquery.scrollbar/jquery.scrollbar.min.js"></script>
        <script src="../../assets/vendor/jquery-scroll-lock/dist/jquery-scrollLock.min.js"></script>
        <!-- Optional JS -->
        <script src="../../assets/vendor/chart.js/dist/Chart.min.js"></script>
        <script src="../../assets/vendor/chart.js/dist/Chart.extension.js"></script>
        <!-- Argon JS -->
        <script src="../../assets/js/argon.min5438.js?v=1.2.0"></script>
        <script src="../../assets/vendor/jquery/dist/jquery.min.js"></script>
<script src="../../assets/vendor/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
<script src="../../assets/vendor/js-cookie/js.cookie.js"></script>
<script src="../../assets/vendor/jquery.scrollbar/jquery.scrollbar.min.js"></script>
<script src="../../assets/vendor/jquery-scroll-lock/dist/jquery-scrollLock.min.js"></script>
<!-- Optional JS -->
<script src="../../assets/vendor/datatables.net/js/jquery.dataTables.min.js"></script>
<script src="../../assets/vendor/datatables.net-bs4/js/dataTables.bootstrap4.min.js"></script>
<script src="../../assets/vendor/datatables.net-buttons/js/dataTables.buttons.min.js"></script>
<script src="../../assets/vendor/datatables.net-buttons-bs4/js/buttons.bootstrap4.min.js"></script>
<script src="../../assets/vendor/datatables.net-buttons/js/buttons.html5.min.js"></script>
<script src="../../assets/vendor/datatables.net-buttons/js/buttons.flash.min.js"></script>
<script src="../../assets/vendor/datatables.net-buttons/js/buttons.print.min.js"></script>
<script src="../../assets/vendor/datatables.net-select/js/dataTables.select.min.js"></script>
        <script src="../../assets/js/demo.min.js"></script>
        <!-- Demo JS - remove this in your project -->
        <script>
          // Facebook Pixel Code Don't Delete
          ! function(f, b, e, v, n, t, s) {
            if (f.fbq) return;
            n = f.fbq = function() {
              n.callMethod ?
                n.callMethod.apply(n, arguments) : n.queue.push(arguments)
            };
            if (!f._fbq) f._fbq = n;
            n.push = n;
            n.loaded = !0;
            n.version = '2.0';
            n.queue = [];
            t = b.createElement(e);
            t.async = !0;
            t.src = v;
            s = b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t, s)
          }(window,
            document, 'script', '../../../../connect.facebook.net/en_US/fbevents.js');

          try {
            fbq('init', '111649226022273');
            fbq('track', "PageView");

          } catch (err) {
            console.log('Facebook Track Error:', err);
          }
        </script>
        <script type="text/javascript">
            $(document).ready(function() {
            $('.datatable').DataTable();
        } );
        </script>
        <script>
        $('#myDropdown .dropdown-menu').on({
           "click":function(e) {
               e.stopPropagation();
            }
        });
       
        </script>

    </body>
    </html>
