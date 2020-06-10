import React, {Component} from 'react';
import Menu from '../Components/menu';
import { makeYourJob } from '../Components/AditionalLinks';

class DefaultLayout extends Component{
  
  constructor(props){
    super(props);
  }

  render(){
    return (
      <html>
      <head>
          <title>FIDU - {this.props.title}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"/>
          <link href="https://fonts.googleapis.com/css?family=Chathura|Hind+Vadodara|Major+Mono+Display&display=swap" rel="stylesheet"/>
          <link rel='stylesheet' href='/stylesheets/default.css' />
          {makeYourJob(this.props.links)}
      </head>
      <body>
          <Menu />
          <div className='container pt-5'>
              {this.props.children}
          </div>
          <script src="https://kit.fontawesome.com/84e2422fb7.js" crossOrigin="anonymous"></script>
          <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossOrigin="anonymous"></script>
          <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossOrigin="anonymous"></script>
          <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossOrigin="anonymous"></script>
      </body>
      </html>
    );
  }
}

export default DefaultLayout;