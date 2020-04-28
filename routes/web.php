<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return view('welcome');
// });
Route::get('/verifytoken',"UserApiController@checkToken");
Route::post('/student/register',"UserApiController@registerStudent");
Route::post('/father/register',"UserApiController@registerFather");



function spinrewriter_api_post($data){
		$data_raw = "";
		foreach ($data as $key => $value){
			$data_raw = $data_raw . $key . "=" . urlencode($value) . "&";
		}
		
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, "http://www.spinrewriter.com/action/api");
		curl_setopt($ch, CURLOPT_POST, true);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $data_raw);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		$response = trim(curl_exec($ch));
		curl_close($ch);
		return $response;
	}

Route::get("/testing",function(){
	/*
	* Note: Spin Rewriter API server is using a 120-second timeout.
	* Client scripts should use a 150-second timeout to allow for HTTP connection overhead.
	*/
	
	$data = array();
	
	// Spin Rewriter API settings - authentication:
	$data['email_address'] = "jhonpatric89@gmail.com";				// your Spin Rewriter email address goes here
	$data['api_key'] = "c10a111#5a00f80_8678155?ea74fac";		// your unique Spin Rewriter API key goes here
	
	// Spin Rewriter API settings - request details:
	$data['action'] = "unique_variation";				// possible values: 'api_quota', 'text_with_spintax', 'unique_variation', 'unique_variation_from_spintax'
	$data['text'] = "New Delhi: Doctors and other health workers working to contain the spread of COVID-19 are facing another problem in Uttar Pradesh – the poor living conditions of the residential facilities provided for them to be under “active quarantine” while they work.\nOn Wednesday, a number of doctors were shifted out of one such facility in Rae Bareli after they took to social media and released videos about the abysmal condition in the facility where they were lodged. Subsequently, the chief medical officer visited the quarantine centre that was operating in a government school and on not finding the facilities up to the mark, ordered that the doctors be shifted to a guest house.\nIt was as a matter of abundant precaution that the doctors had been quarantined in the centre, since Rae Bareli had reported 43 COVID-19 cases. The idea was to keep their families protected from the disease.\nBut the facility created for them was not up to the mark.\nThe doctors therefore released three videos to show their plight. One of these was shot at 3 am on Wednesday, another later after day break and the third during lunch time.\n“It is 3 am. There is no electricity; there are four cots to a single room. This is five-star class (but) not even a fan is working. Let me show you the common bathrooms here. The urinals have no pipes and the latrines are choked,” a voice was heard saying in the first video.\nIn the second video, shot later in the morning, a doctor in protective personal equipment was heard complaining about choked toilets and power cuts at the facility. “Sleeping arrangements are such that there is a school with big classrooms; each room has four beds. This is against the rules of active quarantine. When we complained about choked bathrooms, they brought a mobile toilet. There was no electricity at night. A 20-litre water bottle was given to us last night and we were told this had to be shared,” he lamented.\nThe third video showed the poor quality of food that was being served to the doctors. “Look at this food being served for lunch. It is packed in polythene and everything is just bunched together – poori and sabzi. This is for doctors and staff engaged in treating COVID-19 patients,” a voice said on the video.\nThe doctors asked if it was okay for the authorities to lodge four of them in the same room, especially when they were in regular direct contact with patients. One of them was also quoted as saying, “We just want to know if these are the standards for healthcare workers treating COVID-19 patients. If one of us gets infected, won’t all of us get infected?”\nAlso read: Bihar: A Day in the Life of an ASHA Worker During Lockdown\nAfter their videos went public, CMO S.K. Sharma inspected the school and on not finding the facilities satisfactory ordered that the doctors be shifted. “I inspected the place myself and I did not find the facilities up to the mark. With the help of the administration we have shifted them to a nearby guest house and we will ensure they have no issues with living condition or food and they can be fully satisfied and work,” he said, adding that “a live kitchen” was also being arranged for the doctors so that they are served “hot cooked food”.\nIncidentally, this episode unfolded on a day when Union home minister Amit Shah asserted that the “safety and dignity of doctors is non-negotiable”. Earlier, Prime Minister Narendra Modi had termed them and other health workers “corona warriors” and urged people to “pay utmost respect” to them.\n";
	$data['protected_terms'] = "John\nDouglas Adams\nthen";		// protected terms: John, Douglas Adams, then
	$data['auto_protected_terms'] = "false";					// possible values: 'false' (default value), 'true'
	$data['confidence_level'] = "medium";						// possible values: 'low', 'medium' (default value), 'high'
	$data['nested_spintax'] = "true";							// possible values: 'false' (default value), 'true'
	$data['auto_sentences'] = "false";							// possible values: 'false' (default value), 'true'
	$data['auto_paragraphs'] = "false";							// possible values: 'false' (default value), 'true'
	$data['auto_new_paragraphs'] = "false";						// possible values: 'false' (default value), 'true'
	$data['auto_sentence_trees'] = "false";						// possible values: 'false' (default value), 'true'
	$data['spintax_format'] = "{|}";							// possible values: '{|}' (default value), '{~}', '[|]', '[spin]', '#SPIN'
	



	
	// Don't change anything below this comment.
	
	// Make the actual API request and save the JSON response.
	$api_response = spinrewriter_api_post($data);
	
	// Output raw JSON response (as a string).
	echo "<b>Raw JSON response:</b>     <br /><br />     \n\n";
	print_r($api_response);
	echo "<br /><br /><br /><br />     \n\n\n\n";
	
	// Output interpreted JSON response (as a native PHP array).
	$api_response_interpreted = json_decode($api_response, true);
	echo "<b>Interpreted JSON response:</b>     <br /><br />     \n\n<pre>";
	print_r($api_response_interpreted);
	echo "</pre><br /><br /><br /><br />     \n\n\n\n";
	
	/*
	 * Example of interpreted JSON response (success):
	 * Array
	 * (
     *  	[status] => OK
     *  	[response] => John will {book|make a reservation for|reserve|} a room. Then he will read {a book|a novel} by Douglas Adams.
     *  	[api_requests_made] => 7
     *  	[api_requests_available] => 43
     *  	[protected_terms] => john, douglas adams, then
     *  	[confidence_level] => medium
	 * )
	 * 
	 * Example of interpreted JSON response (error):
	 * Array
	 * (
     *  	[status] => ERROR
     *  	[response] => API quota exceeded. You can make 100 requests per day.
	 * )
	 */
	
	
	
	/**
	 * Sends a request to the Spin Rewriter API and returns the unformatted response.
	 * @param $data
	 */
	


});

Route::view('/{path?}', 'app')
     ->where('path', '.*')
     ->name('react');
