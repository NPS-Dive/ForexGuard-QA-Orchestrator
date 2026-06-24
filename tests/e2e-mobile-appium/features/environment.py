import os
from appium import webdriver
from appium.options.android import UiAutomator2Options
from appium.options.ios import XCUITestOptions

def before_all(context):
    # Set this to 'ios' when you move to macOS
    platform = os.getenv('TARGET_PLATFORM', 'android').lower()
    
    appium_server_url = 'http://127.0.0.1:4723'

    if platform == 'android':
        options = UiAutomator2Options()
        options.platform_name = 'Android'
        options.automation_name = 'UiAutomator2'
        # Point to the APK you downloaded
        options.app = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'apps', 'mda-1.0.13-15.apk'))
        # Add this line to tell Appium not to strictly wait for the SplashActivity
        options.set_capability("appWaitActivity", "*")
        options.set_capability("appWaitDuration", 30000) # Optional: give the emulator 30 seconds to load

        # Optional: you can specify emulator name if you have multiple
        # options.device_name = 'emulator-5554'
        # Adde this line to bypass the blocked port 8200:
        options.set_capability("systemPort", 8210)
        
        context.driver = webdriver.Remote(appium_server_url, options=options)
        
    elif platform == 'ios':
        # FUTURE iOS CONFIGURATION (For macOS)
        options = XCUITestOptions()
        options.platform_name = 'iOS'
        options.automation_name = 'XCUITest'
        options.device_name = 'iPhone 14' # Change to your target simulator
        options.platform_version = '16.4' # Change to your target iOS version
        # Point to your future .app or .ipa file
        # options.app = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'apps', 'YourApp.app'))
        
        context.driver = webdriver.Remote(appium_server_url, options=options)
    
    else:
        raise ValueError(f"Unsupported platform: {platform}")

    context.driver.implicitly_wait(10)

def after_all(context):
    if hasattr(context, 'driver'):
        context.driver.quit()
