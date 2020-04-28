<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Father Register</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
  </head>
  <body style="padding:1%">
    <h2>Father Register</h2>
    <form action="/father/register" method="post">
        @csrf
    <div class="form-group">
      <label for="exampleInputEmail1">Email address</label>
      <input type="hidden" value="{{$token}}" name="token"/>
      <input type="hidden" value="{{$email}}" name="user_email_hidden"/>
      <input type="email"  class="form-control" id="exampleInputEmail1" disabled value="{{$email}}" aria-describedby="emailHelp" placeholder="Enter email" name="user_email">
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Password</label>
      <input type="password" name="password" class="form-control" id="exampleInputPassword1" required placeholder="Password">
    </div>

    <div class="form-group">
      <label for="exampleInputPassword1">Re-Password</label>
      <input type="password" name="repassword" class="form-control" id="exampleInputPassword1" required placeholder="Re-Password">
    </div>

    <button type="submit" class="btn btn-primary">Submit</button>
</form>
  </body>
</html>
