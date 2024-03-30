import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-github-users-list',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './github-users-list.component.html',
  styleUrl: './github-users-list.component.css'
})
export class GithubUsersListComponent implements OnInit {

  constructor (private http: HttpClient) {

  }

  ngOnInit(): void {
      this.http.get("https://api.github.com/users?per_page=10", {
        headers: {
          // ...(process?.env?.['REACT_APP_GITHUB_TOKEN']
          //   ? { Authorization: `Bearer ${process.env['REACT_APP_GITHUB_TOKEN']}` }
          //   : null),
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28"
        }
      }).subscribe((data) => {
        console.log('data: ', data);
      });
  }


}
