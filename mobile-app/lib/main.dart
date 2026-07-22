import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'screens/splash_screen.dart';
import 'screens/auth/login_screen.dart';
import 'screens/auth/register_screen.dart';
import 'screens/rider/home_screen.dart';
import 'screens/rider/ride_booking_screen.dart';
import 'screens/rider/ride_tracking_screen.dart';
import 'screens/driver/driver_home_screen.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const DropMeApp());
}

class DropMeApp extends StatelessWidget {
  const DropMeApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      title: 'DropMe',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        useMaterial3: true,
        primaryColor: Colors.blue[900],
        appBarTheme: AppBarTheme(
          color: Colors.blue[900],
          elevation: 0,
        ),
      ),
      home: const SplashScreen(),
      getPages: [
        GetPage(name: '/', page: () => const SplashScreen()),
        GetPage(name: '/login', page: () => const LoginScreen()),
        GetPage(name: '/register', page: () => const RegisterScreen()),
        GetPage(name: '/rider-home', page: () => const RiderHomeScreen()),
        GetPage(name: '/book-ride', page: () => const RideBookingScreen()),
        GetPage(name: '/track-ride', page: () => const RideTrackingScreen()),
        GetPage(name: '/driver-home', page: () => const DriverHomeScreen()),
      ],
    );
  }
}
