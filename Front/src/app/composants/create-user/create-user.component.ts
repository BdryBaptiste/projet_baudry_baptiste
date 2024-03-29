import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { User } from '../../../shared/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  nom: string = '';
  prenom: string = '';
  adresse: string = '';
  codePostal: string = '';
  ville: string = '';
  telephone: string = '';
  email: string = '';
  sexe: string = '';
  civilite: string = '';
  login: string = '';
  password: string = '';
  errorMessage: string = '';

  postalCodePattern = /^[0-9]{5}$/;
  sexePattern = /^[MFO]{1}$/;
  telephonePattern = /^[0-9]{10}$/;
  emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {}

  createUser() {
    if (!this.login || !this.password || !this.nom) {
      this.errorMessage = 'Login, Password, and Name are required.';
      return;
    }

    if (this.codePostal && !this.postalCodePattern.test(this.codePostal)) {
      this.errorMessage = 'Invalid Postal Code. It should be 5 digits.';
      return;
    }
  
    if (this.sexe && !this.sexePattern.test(this.sexe)) {
      this.errorMessage = 'Invalid Sexe. It should be M (Male), F (Female), or O (Other).';
      return;
    }
  
    if (this.telephone && !this.telephonePattern.test(this.telephone)) {
      this.errorMessage = 'Invalid Telephone. It should be 10 digits.';
      return;
    }

    if(this.email && !this.emailPattern.test(this.email)){
      this.errorMessage = 'Invalid Email. Check the format.';
      return;
    }

    const userData = {
      nom: this.nom,
      prenom: this.prenom,
      adresse: this.adresse,
      codePostal: this.codePostal,
      ville: this.ville,
      email: this.email,
      sexe: this.sexe,
      civilite: this.civilite,
      login: this.login,
      password: this.password,
      telephone: this.telephone,
    };

    const newUser = new User(userData);

    

    this.apiService.createUser(newUser).subscribe({
      next: (u) => {
        console.log('User created:', u);
        this.errorMessage = '';
        this.router.navigate(['/catalog']);
      },
      error: (error) => {
        console.error('Error creating user:', error);
        this.errorMessage = 'Error creating user. Please try again.';
      }
    });
  }
}
