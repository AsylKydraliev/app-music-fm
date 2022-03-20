import { Component, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { ArtistData } from '../../models/artist.model';
import { createArtistRequest } from '../../store/artists/artists.actions';

@Component({
  selector: 'app-form-artist',
  templateUrl: './form-artist.component.html',
  styleUrls: ['./form-artist.component.sass']
})
export class FormArtistComponent {
  @ViewChild('f') form!: NgForm;

  loading: Observable<boolean>;
  error: Observable<null | string>;

  constructor(private store: Store<AppState>) {
    this.loading = store.select(state => state.artists.createLoading);
    this.error = store.select(state => state.artists.createError);
  }

  onSubmit() {
    const artistData: ArtistData = this.form.value;
    this.store.dispatch(createArtistRequest({artistData: artistData}));
  }
}
