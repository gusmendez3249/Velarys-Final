import { Injectable } from '@angular/core';
import { debounceTime, switchMap, BehaviorSubject} from 'rxjs';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
private apiKey: string = 'AIzaSyBcooOo0Ow2K-d5Gc_VzXt_3l4nLzs7PcI' 
private searchQuery = new BehaviorSubject<string>('');

  constructor() { 
    this.searchQuery.pipe(
      debounceTime(300),
      switchMap(query => this.searchVideos(query))
    ).subscribe
  }

setSearchQuery (query : string){
  this.searchQuery.next(query);
}

async searchVideos(query : string){
  const response = await axios.get('https://www.googleapis.com/youtube/v3/search',{
    params:{
      part:'snippet',
      q: query,
      key: this.apiKey,
      maxResults: 10
    }
  });
return response.data.items;
}
}
