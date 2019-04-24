


import org.openqa.selenium.By;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.Charset;
import java.util.NoSuchElementException;
import java.util.Random;

public class RegisterSeleniumTest {
	
public static void main(String[] args) throws InterruptedException, IOException {
	System.setProperty("webdriver.chrome.driver","C:\\Users\\billy\\Downloads\\chromedriver_win32\\chromedriver.exe");
	WebDriver driver = new ChromeDriver();

	driver.get("http://localhost:3000/");
	WebElement username = driver.findElement(By.name("username"));
	WebElement password = driver.findElement(By.name("password"));	
	WebElement nextButton = driver.findElement(By.className("MuiButton-label-86"));			

 
    for (int i = 0; i < 2; i++) {

        byte[] array = new byte[7]; 
        new Random().nextBytes(array);
        String generatedString = new String(array, Charset.forName("ASCII"));
        
        username.sendKeys(generatedString);
        Thread.sleep(500);
        password.sendKeys(generatedString);
        Thread.sleep(500);
        nextButton.click();
        Thread.sleep(500);
        username.clear();
        Thread.sleep(500);
        password.clear();
        Thread.sleep(500);
    }
   
    username.sendKeys("");
    password.sendKeys("");
    nextButton.click();
    Thread.sleep(1000);
    username.sendKeys("bo");
    password.sendKeys("11");
    nextButton.click();
    Thread.sleep(1000);
    
}
}