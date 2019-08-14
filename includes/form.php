<form class="form" method="post">
  
  <div class="form-group">
    <label class="control-label" for="name">What's your name?</label>
    <input name="name" id="name" type="text" class="form-control" autocomplete="off" placeholder="What's your name?" required>
  </div>

  <div class="form-group">
    <label class="control-label" for="email">What's your email?</label>
    <input name="email" id="email" type="email" class="form-control" autocomplete="off" placeholder="What's your email?">
  </div>
  
  <div class="form-group">
    <label class="control-label" for="message">What's Up?</label>
    <textarea name="message" id="message" class="form-control" rows="3" placeholder="What's Up?" required></textarea>
  </div>
  
  <div class="mt-5 mb-4">
		<div class="custom-control custom-checkbox">
		  <input type="checkbox" class="custom-control-input" id="privacy" required>
		  <label class="custom-control-label" for="privacy">I've read and I accept the <a href="privacy-policy.php" class="underlined" target="_blank">Privacy Policy</a></label>
		</div>
	</div>
  
  <button type="submit" class="btn btn-lg"><img src="img/icons/arrow-btn.svg" class="svg"> Send message</button>
  
</form>