package firstPackage;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class registerTest {
	static String[] myUserName = {"escistd50.003"};
	static String[] myPassword = {"SUTD@Singapore"};
	
	public static void main(String[] args) throws InterruptedException {		

		System.setProperty("webdriver.chrome.driver","C:\\Users\\billy\\Downloads\\chromedriver_win32\\chromedriver.exe");
		WebDriver driver = new ChromeDriver();
		
		driver.get("http://localhost:3000/register");
				
		// get all the links
		//java.util.List<WebElement> links = driver.findElements(By.tagName("a"));
		//System.out.println(links.size());
		
		// get the user name field of the account page
		for(int i = 0; i<myUserName.length;i++) {
		WebElement firstname = driver.findElement(By.name("firstName"));
		
		Thread.sleep(300);
		
		// send my user name to fill up the box
		firstname.sendKeys(myUserName[i]);
		
		Thread.sleep(300);
		
		WebElement lastname = driver.findElement(By.name("lastName"));
		
		Thread.sleep(300);

		lastname.sendKeys(myUserName[i]);
		
		Thread.sleep(300);
		
		WebElement username = driver.findElement(By.name("username"));
		
		Thread.sleep(300);

		username.sendKeys(myUserName[i]);
		
		Thread.sleep(300);
		
		WebElement email = driver.findElement(By.name("email"));
		
		Thread.sleep(300);

		email.sendKeys("abc@example.com");
		
		Thread.sleep(300);
		
		
		WebElement vecode = driver.findElement(By.name("vecode"));
		
		Thread.sleep(300);

		vecode.sendKeys("1111");
		
		Thread.sleep(300);
		
		WebElement password = driver.findElement(By.name("password"));
		
		Thread.sleep(300);

		password.sendKeys("1111");
		
		Thread.sleep(300);
		
		WebElement confirmpassword = driver.findElement(By.name("confirmpassword"));
		
		Thread.sleep(300);

		confirmpassword.sendKeys("1111");
		
		Thread.sleep(300);
		
		WebElement phone = driver.findElement(By.name("phone"));
		
		Thread.sleep(300);

		phone.sendKeys("1111");
		
		Thread.sleep(300);
		
		
		
		
		
		
	
		
		// locate the "Next" button in the account page
//		WebElement nextButton = driver.findElement(By.id("recaptcha"));		
//		nextButton.click();
//		
		// sleep until the page loads
//		Thread.sleep(1000);
//
//		// now locate the password field in the current page
//		WebElement password = driver.findElement(By.name("password"));		
//
//		// send password 
//		password.sendKeys(myPassword[i]);
//		
//		Thread.sleep(3000);
		WebElement nextButton = driver.findElement(By.className("MuiButton-label-88"));		
		nextButton.click();
		}
		
				
		// login and :)
//		nextButton = driver.findElement(By.id("passwordNext"));		
//		nextButton.click();
	}

}
