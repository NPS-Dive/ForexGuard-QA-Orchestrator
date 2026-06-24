from behave import given, when, then
from appium.webdriver.common.appiumby import AppiumBy
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

@given('the user is on the login screen')
def step_navigate_to_login(context):
    # 1. Wait a few seconds for the app to load fully
    time.sleep(5)
    
    # 2. Tap the hamburger menu using its Accessibility ID found in the XML
    menu_button = WebDriverWait(context.driver, 10).until(
        EC.element_to_be_clickable((AppiumBy.ACCESSIBILITY_ID, "View menu"))
    )
    menu_button.click()
    
    # 3. Wait a moment for the drawer animation
    time.sleep(2)
    
    # 4. Tap "Log In" from the menu
    login_menu_item = WebDriverWait(context.driver, 10).until(
        EC.element_to_be_clickable((AppiumBy.XPATH, "//*[@text='Log In']"))
    )
    login_menu_item.click()

@when('the user enters username "{username}" and password "{password}"')
def step_enter_credentials(context, username, password):
    # Wait for the login screen to load
    time.sleep(2) 
    
    # Use resource-id found in your page_source_login.xml
    username_input = WebDriverWait(context.driver, 10).until(
        EC.presence_of_element_located((AppiumBy.ID, "com.saucelabs.mydemoapp.android:id/nameET"))
    )
    username_input.clear()
    username_input.send_keys(username)
    
    password_input = WebDriverWait(context.driver, 10).until(
        EC.presence_of_element_located((AppiumBy.ID, "com.saucelabs.mydemoapp.android:id/passwordET"))
    )
    password_input.clear()
    password_input.send_keys(password)

@when('the user taps the login button')
def step_tap_login(context):
    # Use resource-id found in your page_source_login.xml
    login_btn = WebDriverWait(context.driver, 10).until(
        EC.element_to_be_clickable((AppiumBy.ID, "com.saucelabs.mydemoapp.android:id/loginBtn"))
    )
    login_btn.click()

@then('the user should see the products screen')
def step_verify_products_screen(context):
    # Check for the Products text in the header
    products_title = WebDriverWait(context.driver, 15).until(
        EC.presence_of_element_located((AppiumBy.XPATH, "//*[@text='Products']"))
    )
    assert products_title.is_displayed(), "Products screen is not displayed."
