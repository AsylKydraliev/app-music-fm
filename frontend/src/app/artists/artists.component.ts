import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Artist } from '../models/artist.model';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.sass']
})
export class ArtistsComponent implements OnInit {
  artists!: Artist[];
  api = environment.apiUrl;

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.httpService.getArtists().subscribe(artists => {
      console.log(artists);
      this.artists = artists;
    });
  }

}
