package firstPackage;

import org.openqa.selenium.By;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

import java.util.Random;

public class SeleniumMainToLogin {
		
	public static void main(String[] args) throws InterruptedException {		
		System.setProperty("webdriver.chrome.driver","C:\\Users\\billy\\Downloads\\chromedriver_win32\\chromedriver.exe");
		WebDriver driver = new ChromeDriver();

		driver.get("http://localhost:3000");
		WebElement nextButton = driver.findElement(By.className("MuiButton-label-43"));	
		Thread.sleep(3000);
		nextButton.click();
		WebElement nextButton1 = driver.findElement(By.className("MuiButton-label-43"));		
		Thread.sleep(3000);
		nextButton1.click();
    }
}