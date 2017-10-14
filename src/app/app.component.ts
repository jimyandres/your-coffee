import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import { Events } from 'ionic-angular';

import {HomePage} from '../pages/home/home';
import {ProfilePage} from '../pages/profile/profile';
import {AboutPage} from '../pages/about/about';
import {SearchPage} from "../pages/search/search";
import {LoginPage} from "../pages/login/login";

import { YourCoffeeWebServiceProvider } from "../providers/your-coffee-web-service/your-coffee-web-service";
import { Storage } from '@ionic/storage';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = HomePage;

    pages: Array<{ title: string, component: any, icon: string }>;
    authPages: Array<{ title: string, component: any, icon: string }>;
    unAuthPages: Array<{ title: string, component: any, icon: string }>;

    user: any = {'data': null};

    constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public yourCoffeeService: YourCoffeeWebServiceProvider, private events: Events, public storage: Storage) {
        this.initializeApp();
        this.listenToAuthEvents();

        // used for an example of ngFor and navigation
        this.pages = [
            // {title: 'Perfil', component: ProfilePage, icon: 'contact'},
            // {title: 'Iniciar sesión', component: LoginPage, icon: 'log-in'},
            {title: 'Página principal', component: HomePage, icon: 'cafe'},
            {title: 'Acerca de', component: AboutPage, icon: 'information-circle'},
            // {title: 'List', component: ListPage, icon: 'left-arrow'}
        ];
        this.authPages = [
            {title: 'Perfil', component: ProfilePage, icon: 'person'},
            {title: 'Cerrar Sesión', component: 'Logout', icon: 'log-out'},
        ]
        this.unAuthPages = [
            {title: 'Iniciar Sesión', component: LoginPage, icon: 'log-in'},
        ]

    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.splashScreen.hide();

            this.user = this.storage.get('user-token').then((token) => {
                // console.log(token);
                if(token != null) {
                    this.yourCoffeeService.user(token).then((user) => {
                        // console.log(user);
                        this.user = user;
                        // console.log(this.user);
                        if (this.user.data == null) {
                            this.rootPage = LoginPage;
                        } else {
                            this.rootPage = HomePage;
                        }

                    }, (err) => {
                        // console.log(err);
                        let res = err.json();

                        if(res.error = 'Unauthenticated.') {
                            this.rootPage = LoginPage;
                        }
                        // console.log(err.json());
                        // this.nav.setRoot(this.rootPage);
                    });
                } else {
                    this.rootPage = LoginPage;
                }

                this.nav.setRoot(this.rootPage);
            },
            (err) => {
                console.log(err);
                let res = err.json();

                if(res.error = 'Unauthenticated.') {
                    this.rootPage = LoginPage;
                }
                console.log(err.json());
                this.nav.setRoot(this.rootPage);
            });
        });
    }

    listenToAuthEvents() {
        this.events.subscribe('auth:login', (data) => {
            this.user = data;
            this.nav.setRoot(HomePage);
        });

        this.events.subscribe('auth:logout', (data) => {
            this.user = data;
        });
    }

    openPage(page) {
        if(page == 'Logout') {
            this.logOut();
            page = HomePage;
        }
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page);
    }

    searchPage() {
        // Redirect to the search page
        this.nav.push(SearchPage);
    }

    logOut() {
        this.yourCoffeeService.logout().then((res: any) => {
            // console.log(res);
            if(res.status == 'success') {
                // console.log(res.message);
                this.events.publish('auth:logout', {'data': null});
            }
        },
        (err) => {
            console.log(err.json());
        });
    }
}
