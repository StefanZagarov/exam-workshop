import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-song-details',
  standalone: true,
  imports: [],
  templateUrl: './song-details.component.html',
  styleUrl: './song-details.component.css'
})
export class SongDetailsComponent implements OnInit
{
  constructor(private activatedRoute: ActivatedRoute, private apiService: ApiService, private userService: UserService) { };


  ngOnInit(): void
  {
    const id = this.activatedRoute.snapshot.params[`songId`];
  }

}
