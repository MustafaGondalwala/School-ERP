<!DOCTYPE html>
    <html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
        <link rel="icon" href="/assets/img/brand/favicon.png" type="image/png">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700">
        <link rel="stylesheet" href="/assets/vendor/nucleo/css/nucleo.css" type="text/css">
        <link rel="stylesheet" href="/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css" type="text/css">
        <link rel="stylesheet" href="/assets/css/argon.min5438.css?v=1.2.0" type="text/css">
        <link rel="stylesheet" href="/assets/vendor/datatables.net-bs4/css/dataTables.bootstrap4.min.css">
        <link rel="stylesheet" href="/assets/vendor/datatables.net-buttons-bs4/css/buttons.bootstrap4.min.css">
        <link rel="stylesheet" href="/assets/vendor/datatables.net-select-bs4/css/select.bootstrap4.min.css">
        <link rel="stylesheet" href="/assets/vendor/animate.css/animate.min.css" />
        <link rel="stylesheet" href="/assets/vendor/fullcalendar/dist/fullcalendar.min.css" />
        <link rel="stylesheet" href="{{ secure_asset('css/argon.css')}}" type="text/css">
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
              '//www.googletagmanager.com/gtm5445.html?id=' + i + dl;
            f.parentNode.insertBefore(j, f);
          })(window, document, 'script', 'dataLayer', 'GTM-NKDMSK6');
        </script>
        <title>School Erp</title>
    </head>
    <body>
        <div id="app"></div>
        <script src="{{ asset('js/app.js') }}"></script>
        <script src="/assets/vendor/jquery/dist/jquery.min.js"></script>
        <script src="/assets/vendor/js-cookie/js.cookie.js"></script>
        <script src="/assets/vendor/jquery-scroll-lock/dist/jquery-scrollLock.min.js"></script>
        <script src="/assets/js/argon.min5438.js?v=1.2.0"></script>
        
    </body>
    </html>
