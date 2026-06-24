import axios from "axios";

const MOCK_MOVIES = {
  Action: [
    {
      imdbID: "tt1596363",
      Title: "Black Adam",
      Year: "2022",
      Poster: "https://m.media-amazon.com/images/M/MV5BYzZkOGUwMzMtMTgyNS00YjFlLTg5NzYtZTE3Y2E5YTA5NWIyXkEyXkFqcGc@._V1_SX300.jpg",
      Genre: "Action, Adventure, Fantasy",
      imdbRating: "6.3",
      Runtime: "125 min",
      Plot: "Nearly 5,000 years after he was bestowed with the almighty powers of the ancient gods--and imprisoned just as quickly--Black Adam is freed from his earthly tomb, ready to unleash his unique form of justice on the modern world.",
      Actors: "Dwayne Johnson, Aldis Hodge, Pierce Brosnan, Noah Centineo"
    },
    {
      imdbID: "tt9032400",
      Title: "Eternals",
      Year: "2021",
      Poster: "https://m.media-amazon.com/images/M/MV5BY2YyZjQyZDUtNWU3My00NzQ0LWE4N2MtM2E0Yjk3MTE1MDUzXkEyXkFqcGc@._V1_SX300.jpg",
      Genre: "Action, Adventure, Fantasy",
      imdbRating: "6.3",
      Runtime: "156 min",
      Plot: "The saga of the Eternals, a race of immortal beings who lived on Earth and shaped its history and civilizations.",
      Actors: "Gemma Chan, Richard Madden, Angelina Jolie, Salma Hayek"
    },
    {
      imdbID: "tt1745960",
      Title: "Top Gun: Maverick",
      Year: "2022",
      Poster: "https://m.media-amazon.com/images/M/MV5BZWYzOGEwNTgtNWU3NS00ZGQ0LWE3MDMtMGMwNTgyODc5OTQ5XkEyXkFqcGc@._V1_SX300.jpg",
      Genre: "Action, Drama",
      imdbRating: "8.3",
      Runtime: "130 min",
      Plot: "After thirty years, Maverick is still pushing the envelope as a top naval aviator, but must confront ghosts of his past when he leads TOP GUN's elite graduates on a mission that demands the ultimate sacrifice from those chosen to fly it.",
      Actors: "Tom Cruise, Miles Teller, Jennifer Connelly, Jon Hamm"
    },
    {
      imdbID: "tt6723592",
      Title: "Tenet",
      Year: "2020",
      Poster: "https://m.media-amazon.com/images/M/MV5BMzU3YWYwNTQtMDI2MC00ZDVhLTlhMzItYTMiZjkwMTdmOWVjXkEyXkFqcGc@._V1_SX300.jpg",
      Genre: "Action, Sci-Fi, Thriller",
      imdbRating: "7.3",
      Runtime: "150 min",
      Plot: "Armed with only one word, Tenet, and fighting for the survival of the entire world, a Protagonist journeys through a twilight world of international espionage on a mission that will unfold in something beyond real time.",
      Actors: "John David Washington, Robert Pattinson, Elizabeth Debicki, Jupinder Singh"
    }
  ],
  Drama: [
    {
      imdbID: "tt0111161",
      Title: "The Shawshank Redemption",
      Year: "1994",
      Poster: "https://m.media-amazon.com/images/M/MV5BMDAyY2FhYjctNDc5OS00MDNmLWEyNDEtYWNhMTdmODA5MTFiXkEyXkFqcGc@._V1_SX300.jpg",
      Genre: "Drama",
      imdbRating: "9.3",
      Runtime: "142 min",
      Plot: "Over the course of several years, two convicts form a friendship, seeking consolation and, eventually, redemption through basic compassion.",
      Actors: "Tim Robbins, Morgan Freeman, Bob Gunton, William Sadler"
    },
    {
      imdbID: "tt0068646",
      Title: "The Godfather",
      Year: "1972",
      Poster: "https://m.media-amazon.com/images/M/MV5BYTJkNGQyYzUtZDQ0Yi00MDM0LWEwNDYtNDc4MWU0Nzg5MmYwXkEyXkFqcGc@._V1_SX300.jpg",
      Genre: "Crime, Drama",
      imdbRating: "9.2",
      Runtime: "175 min",
      Plot: "The aging patriarch of an organized crime dynasty in postwar New York City transfers control of his clandestine empire to his reluctant youngest son.",
      Actors: "Marlon Brando, Al Pacino, James Caan, Diane Keaton"
    },
    {
      imdbID: "tt0109830",
      Title: "Forrest Gump",
      Year: "1994",
      Poster: "https://m.media-amazon.com/images/M/MV5BNDYwNzUxMDUtN2Y3Yi00OGM1LWIyZTktMmQ3Y2ZiYjY3NTliXkEyXkFqcGc@._V1_SX300.jpg",
      Genre: "Drama, Romance",
      imdbRating: "8.8",
      Runtime: "142 min",
      Plot: "The history of the United States from the 1950s to the '70s unfolds from the perspective of an Alabama man with an IQ of 75, who yearns to be reunited with his childhood sweetheart.",
      Actors: "Tom Hanks, Robin Wright, Gary Sinise, Sally Field"
    },
    {
      imdbID: "tt1375666",
      Title: "Inception",
      Year: "2010",
      Poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
      Genre: "Action, Sci-Fi, Adventure",
      imdbRating: "8.8",
      Runtime: "148 min",
      Plot: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project.",
      Actors: "Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page, Ken Watanabe"
    }
  ],
  Romance: [
    {
      imdbID: "tt2582846",
      Title: "The Fault in Our Stars",
      Year: "2014",
      Poster: "https://m.media-amazon.com/images/M/MV5BMTk1MDE2NzcwNF5BMl5BanBnXkFtZTgwNTU5ODcxMTE@._V1_SX300.jpg",
      Genre: "Drama, Romance",
      imdbRating: "7.7",
      Runtime: "126 min",
      Plot: "Two teenage cancer patients begin a life-affirming journey to visit a reclusive author in Amsterdam.",
      Actors: "Shailene Woodley, Ansel Elgort, Nat Wolff, Laura Dern"
    },
    {
      imdbID: "tt0120338",
      Title: "Titanic",
      Year: "1997",
      Poster: "https://m.media-amazon.com/images/M/MV5BYzYyN2FiZmUtY2MyMC00NDFmLTgwNDUtMDc1ZmUxMTcyM2M4XkEyXkFqcGc@._V1_SX300.jpg",
      Genre: "Drama, Romance",
      imdbRating: "7.9",
      Runtime: "194 min",
      Plot: "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.",
      Actors: "Leonardo DiCaprio, Kate Winslet, Billy Zane, Kathy Acadia"
    },
    {
      imdbID: "tt2139881",
      Title: "La La Land",
      Year: "2016",
      Poster: "https://m.media-amazon.com/images/M/MV5BMzUzNDM2NzM2MV5BMl5BanBnXkFtZTgwNTU3NTg4OTE@._V1_SX300.jpg",
      Genre: "Comedy, Drama, Music, Romance",
      imdbRating: "8.0",
      Runtime: "128 min",
      Plot: "While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations for the future.",
      Actors: "Ryan Gosling, Emma Stone, Rosemarie DeWitt, J.K. Simmons"
    },
    {
      imdbID: "tt0332280",
      Title: "The Notebook",
      Year: "2004",
      Poster: "https://m.media-amazon.com/images/M/MV5BMTk3NTU5MTA1NF5BMl5BanBnXkFtZTcwNDI1ODYzMw@@._V1_SX300.jpg",
      Genre: "Drama, Romance",
      imdbRating: "7.8",
      Runtime: "123 min",
      Plot: "A poor young man falls in love with a rich young woman, giving her a sense of freedom, but they are soon separated because of their social differences.",
      Actors: "Ryan Gosling, Rachel McAdams, James Garner, Gena Rowlands"
    }
  ],
  Thriller: [
    {
      imdbID: "tt3480822",
      Title: "Oxygen",
      Year: "2021",
      Poster: "https://m.media-amazon.com/images/M/MV5BNDA0Yzg1MzMtOGJjMC00OWY4LTkwNDUtM2FhNmE2MTM5ZGVhXkEyXkFqcGc@._V1_SX300.jpg",
      Genre: "Sci-Fi, Thriller",
      imdbRating: "6.5",
      Runtime: "101 min",
      Plot: "A woman wakes up in a cryogenic chamber with no memory. Running out of oxygen, she must find a way out to survive.",
      Actors: "Mélanie Laurent, Mathieu Amalric, Malik Zidi, Marc Saez"
    },
    {
      imdbID: "tt15474916",
      Title: "Smile",
      Year: "2022",
      Poster: "https://m.media-amazon.com/images/M/MV5BMjY5ZGEwODAtN2MyZC00ZjNhLTg3YTItZTk4M2MxMDM3Yjg4XkEyXkFqcGc@._V1_SX300.jpg",
      Genre: "Horror, Mystery, Thriller",
      imdbRating: "6.5",
      Runtime: "115 min",
      Plot: "After witnessing a bizarre, traumatic incident involving a patient, Dr. Rose Cotter starts experiencing frightening occurrences that she can't explain.",
      Actors: "Sosie Bacon, Jessie T. Usher, Kyle Gallner, Robin Weigert"
    },
    {
      imdbID: "tt12626926",
      Title: "The Gray Man",
      Year: "2022",
      Poster: "https://m.media-amazon.com/images/M/MV5BOWY2MWZjYjEtNGFkYi00MWFhLWI0OTQtYzhjYjg3MTg1MGE1XkEyXkFqcGc@._V1_SX300.jpg",
      Genre: "Action, Thriller",
      imdbRating: "6.5",
      Runtime: "122 min",
      Plot: "When the CIA's most skilled mercenary accidentally uncovers dark agency secrets, he becomes a primary target and is hunted around the world by psychopathic former colleague Lloyd Hansen and international assassins.",
      Actors: "Ryan Gosling, Chris Evans, Ana de Armas, Billy Bob Thornton"
    },
    {
      imdbID: "tt13648212",
      Title: "The Menu",
      Year: "2022",
      Poster: "https://m.media-amazon.com/images/M/MV5BMzVjYWNhYjQtYjM3Yy00NDQyLWEwNDMtNzM4NDhiNDg4NDRlXkEyXkFqcGc@._V1_SX300.jpg",
      Genre: "Horror, Thriller",
      imdbRating: "7.2",
      Runtime: "107 min",
      Plot: "A young couple travels to a remote island to eat at an exclusive restaurant where the chef has prepared a lavish menu, with some shocking surprises.",
      Actors: "Ralph Fiennes, Anya Taylor-Joy, Nicholas Hoult, Hong Chau"
    }
  ],
  Western: [
    {
      imdbID: "tt1853728",
      Title: "Django Unchained",
      Year: "2012",
      Poster: "https://m.media-amazon.com/images/M/MV5BMjIyNTQ5NjUxM15BMl5BanBnXkFtZTcwODg1MDU4OA@@._V1_SX300.jpg",
      Genre: "Drama, Western",
      imdbRating: "8.4",
      Runtime: "165 min",
      Plot: "With the help of a German bounty-hunter, a freed slave sets out to rescue his wife from a brutal Mississippi plantation owner.",
      Actors: "Jamie Foxx, Christoph Waltz, Leonardo DiCaprio, Kerry Washington"
    },
    {
      imdbID: "tt0060196",
      Title: "The Good, the Bad and the Ugly",
      Year: "1966",
      Poster: "https://m.media-amazon.com/images/M/MV5BMjA4NzQ4MDcxOF5BMl5BanBnXkFtZTYwODgxMjYy._V1_SX300.jpg",
      Genre: "Adventure, Western",
      imdbRating: "8.8",
      Runtime: "178 min",
      Plot: "A bounty hunting scam joins two men in an uneasy alliance against a third in a race to find a fortune in gold buried in a remote cemetery.",
      Actors: "Eli Wallach, Clint Eastwood, Lee Van Cleef, Aldo Giuffrè"
    },
    {
      imdbID: "tt0105695",
      Title: "Unforgiven",
      Year: "1992",
      Poster: "https://m.media-amazon.com/images/M/MV5BODM3YWY4NmQtN2Y3My00OTg0LWEwNDAtYTc5YThhNGExNzkzXkEyXkFqcGc@._V1_SX300.jpg",
      Genre: "Drama, Western",
      imdbRating: "8.2",
      Runtime: "131 min",
      Plot: "Retired Old West gunslinger William Munny reluctantly takes on one last job, with the help of his old partner Ned Logan and a young man, The 'Schofield Kid.'",
      Actors: "Clint Eastwood, Gene Hackman, Morgan Freeman, Richard Harris"
    },
    {
      imdbID: "tt1289401",
      Title: "True Grit",
      Year: "2010",
      Poster: "https://m.media-amazon.com/images/M/MV5BMjIxNjgwMDIzOF5BMl5BanBnXkFtZTcwMjIxMDAxNA@@._V1_SX300.jpg",
      Genre: "Drama, Western",
      imdbRating: "7.6",
      Runtime: "110 min",
      Plot: "A stubborn teenager enlists the help of a tough U.S. Marshal to track down her father's killer.",
      Actors: "Jeff Bridges, Matt Damon, Hailee Steinfeld, Josh Brolin"
    }
  ],
  Horror: [
    {
      imdbID: "tt8787200",
      Title: "M3GAN",
      Year: "2022",
      Poster: "https://m.media-amazon.com/images/M/MV5BMDk4MTdhYzEtODk3OS00ZDBjLWFhNTQtMDI2ODdjNzQzZTA3XkEyXkFqcGc@._V1_SX300.jpg",
      Genre: "Horror, Sci-Fi, Thriller",
      imdbRating: "6.4",
      Runtime: "102 min",
      Plot: "A robotics engineer at a toy company builds a life-like doll that begins to take on a life of its own.",
      Actors: "Allison Williams, Violet McGraw, Ronny Chieng, Amie Donald"
    },
    {
      imdbID: "tt1409508",
      Title: "The Invitation",
      Year: "2022",
      Poster: "https://m.media-amazon.com/images/M/MV5BYzA2Nzk5M2EtNWY5YS00MTZkLTg0NjQtMDFkNDYxODcyY2UxXkEyXkFqcGc@._V1_SX300.jpg",
      Genre: "Horror, Thriller",
      imdbRating: "5.3",
      Runtime: "105 min",
      Plot: "A young woman is courted and swept off her feet, only to realize a gothic conspiracy is afoot.",
      Actors: "Nathalie Emmanuel, Thomas Doherty, Sean Pertwee, Hugh Skinner"
    },
    {
      imdbID: "tt13020030",
      Title: "Orphan: First Kill",
      Year: "2022",
      Poster: "https://m.media-amazon.com/images/M/MV5BODU4OWZkY2ItMTZlMS00NTdkLWJkZWYtYTcxNzMwZjY1YTUzXkEyXkFqcGc@._V1_SX300.jpg",
      Genre: "Crime, Drama, Horror, Mystery, Thriller",
      imdbRating: "5.9",
      Runtime: "99 min",
      Plot: "After orchestrating a brilliant escape from an Estonian psychiatric facility, Esther travels to America by impersonating the missing daughter of a wealthy family.",
      Actors: "Isabelle Fuhrman, Julia Stiles, Rossif Sutherland, Hiro Kanagawa"
    },
    {
      imdbID: "tt5555260",
      Title: "Ouija: Origin of Evil",
      Year: "2016",
      Poster: "https://m.media-amazon.com/images/M/MV5BMjQyODg5Njc4N15BMl5BanBnXkFtZTgwMzExMjE3OTE@._V1_SX300.jpg",
      Genre: "Drama, Horror, Mystery, Thriller",
      imdbRating: "6.2",
      Runtime: "99 min",
      Plot: "In 1967 Los Angeles, a widowed mother and her two daughters add a new stunt to bolster their seance scam business, inviting an authentic evil into their home.",
      Actors: "Annalise Basso, Elizabeth Reaser, Lulu Wilson, Henry Thomas"
    }
  ],
  Fantasy: [
    {
      imdbID: "tt0363771",
      Title: "The Chronicles of Narnia",
      Year: "2005",
      Poster: "https://m.media-amazon.com/images/M/MV5BMTc0NTUwMTU5OV5BMl5BanBnXkFtZTcwODA5NTAzMw@@._V1_SX300.jpg",
      Genre: "Adventure, Family, Fantasy",
      imdbRating: "6.9",
      Runtime: "143 min",
      Plot: "Four kids travel through a wardrobe to the land of Narnia and learn of their destiny to free it with the guidance of a mystical lion.",
      Actors: "Tilda Swinton, Georgie Henley, William Moseley, Skandar Keynes"
    },
    {
      imdbID: "tt0241527",
      Title: "Harry Potter and the Sorcerer's Stone",
      Year: "2001",
      Poster: "https://m.media-amazon.com/images/M/MV5BMzU1NDEwMDM2OF5BMl5BanBnXkFtZTgwMzQ5NzQ1MjE@._V1_SX300.jpg",
      Genre: "Adventure, Family, Fantasy",
      imdbRating: "7.6",
      Runtime: "152 min",
      Plot: "An orphaned boy enrolls in a school of wizardry, where he learns the truth about himself, his family and the terrible evil that haunts the magical world.",
      Actors: "Daniel Radcliffe, Rupert Grint, Richard Harris, Maggie Smith"
    },
    {
      imdbID: "tt0120737",
      Title: "The Lord of the Rings: Fellowship of the Ring",
      Year: "2001",
      Poster: "https://m.media-amazon.com/images/M/MV5BY2MxYjA0N2QtYWVlYi00YjQxLTlmOWEtNzU1YmQxMWNhN2VlXkEyXkFqcGc@._V1_SX300.jpg",
      Genre: "Action, Adventure, Drama, Fantasy",
      imdbRating: "8.8",
      Runtime: "178 min",
      Plot: "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
      Actors: "Elijah Wood, Ian McKellen, Orlando Bloom, Sean Bean"
    },
    {
      imdbID: "tt0499549",
      Title: "Avatar",
      Year: "2009",
      Poster: "https://m.media-amazon.com/images/M/MV5BMzYyN2FiZmUtY2MyMC00NDFmLTgwNDUtMDc1ZmUxMTcyM2M4XkEyXkFqcGc@._V1_SX300.jpg",
      Genre: "Action, Adventure, Fantasy, Sci-Fi",
      imdbRating: "7.9",
      Runtime: "162 min",
      Plot: "A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.",
      Actors: "Sam Worthington, Zoe Saldana, Sigourney Weaver, Stephen Lang"
    }
  ],
  Music: [
    {
      imdbID: "tt2582802",
      Title: "Whiplash",
      Year: "2014",
      Poster: "https://m.media-amazon.com/images/M/MV5BOTA5NDY1NTE4NF5BMl5BanBnXkFtZTgwOTA3MDE0MDE@._V1_SX300.jpg",
      Genre: "Drama, Music",
      imdbRating: "8.5",
      Runtime: "106 min",
      Plot: "A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing to realize a student's potential.",
      Actors: "Miles Teller, J.K. Simmons, Paul Reiser, Melissa Benoist"
    },
    {
      imdbID: "tt7074706",
      Title: "Bohemian Rhapsody",
      Year: "2018",
      Poster: "https://m.media-amazon.com/images/M/MV5BMTA2NDc3Njg5NDVeQTJeQWpwZ15BbWU4MDc1NDcxNTUz._V1_SX300.jpg",
      Genre: "Biography, Drama, Music",
      imdbRating: "7.9",
      Runtime: "134 min",
      Plot: "The story of the legendary British rock band Queen and lead singer Freddie Mercury, leading up to their famous performance at Live Aid (1985).",
      Actors: "Rami Malek, Lucy Boynton, Gwilym Lee, Ben Hardy"
    },
    {
      imdbID: "tt4321374",
      Title: "A Star Is Born",
      Year: "2018",
      Poster: "https://m.media-amazon.com/images/M/MV5BN2MyZjA3MTYtMzdlZC00ZDYzLWEzNDMtNzlkNzQ5Yjk2YzdhXkEyXkFqcGc@._V1_SX300.jpg",
      Genre: "Drama, Music, Romance",
      imdbRating: "7.6",
      Runtime: "136 min",
      Plot: "A musician helps a young singer find fame as age and alcoholism send his own career into a downward spiral.",
      Actors: "Lady Gaga, Bradley Cooper, Sam Elliott, Greg Grunberg"
    },
    {
      imdbID: "tt3997504",
      Title: "Rocketman",
      Year: "2019",
      Poster: "https://m.media-amazon.com/images/M/MV5BMTcxSjkwMTctMDlhOC00YTQyLThkMTUtODhiODlkYTFhNWJhXkEyXkFqcGc@._V1_SX300.jpg",
      Genre: "Biography, Drama, Music",
      imdbRating: "7.3",
      Runtime: "121 min",
      Plot: "A musical fantasy about the fantastical human story of Elton John's breakthrough years.",
      Actors: "Taron Egerton, Jamie Bell, Richard Madden, Bryce Dallas Howard"
    }
  ],
  Fiction: [
    {
      imdbID: "tt0816692",
      Title: "Interstellar",
      Year: "2014",
      Poster: "https://m.media-amazon.com/images/M/MV5BYzdjMDAxODItMjQ2Mi00ODAyLTk2Y2UtMDUxYWFiOTI5YmExXkEyXkFqcGc@._V1_SX300.jpg",
      Genre: "Adventure, Drama, Sci-Fi",
      imdbRating: "8.7",
      Runtime: "169 min",
      Plot: "When Earth becomes uninhabitable, a team of explorers travels through a wormhole in space in an attempt to ensure humanity's survival.",
      Actors: "Matthew McConaughey, Anne Hathaway, Jessica Sandbox, Mackenzie Foy"
    },
    {
      imdbID: "tt1375666",
      Title: "Inception",
      Year: "2010",
      Poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
      Genre: "Action, Sci-Fi, Adventure",
      imdbRating: "8.8",
      Runtime: "148 min",
      Plot: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project.",
      Actors: "Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page, Ken Watanabe"
    },
    {
      imdbID: "tt0133093",
      Title: "The Matrix",
      Year: "1999",
      Poster: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDkyZGQyOWU4MTRiXkEyXkFqcGc@._V1_SX300.jpg",
      Genre: "Action, Sci-Fi",
      imdbRating: "8.7",
      Runtime: "136 min",
      Plot: "When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.",
      Actors: "Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss, Hugo Weaving"
    },
    {
      imdbID: "tt0499549",
      Title: "Avatar",
      Year: "2009",
      Poster: "https://m.media-amazon.com/images/M/MV5BMzYyN2FiZmUtY2MyMC00NDFmLTgwNDUtMDc1ZmUxMTcyM2M4XkEyXkFqcGc@._V1_SX300.jpg",
      Genre: "Action, Adventure, Fantasy, Sci-Fi",
      imdbRating: "7.9",
      Runtime: "162 min",
      Plot: "A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.",
      Actors: "Sam Worthington, Zoe Saldana, Sigourney Weaver, Stephen Lang"
    }
  ]
};

const movieClient = axios.create({
  baseURL: "https://www.omdbapi.com",
});

export const searchMovieByGenre = async (genre, apiKey = "") => {
  const key = apiKey || import.meta.env.VITE_MOVIE_API_KEY || "";
  if (!key) {
    return MOCK_MOVIES[genre] || MOCK_MOVIES.Action;
  }
  try {
    const response = await movieClient.get(
      `/?s=${encodeURIComponent(genre)}&type=movie&apikey=${key}`
    );
    if (response.data && response.data.Search) {
      return response.data.Search;
    }
    return MOCK_MOVIES[genre] || MOCK_MOVIES.Action;
  } catch (error) {
    console.warn("Movie service failure, using fallback mock movies:", error);
    return MOCK_MOVIES[genre] || MOCK_MOVIES.Action;
  }
};

export const fetchMovieDetails = async (imdbID, apiKey = "") => {
  const key = apiKey || import.meta.env.VITE_MOVIE_API_KEY || "";
  if (!key) {
    for (const genre in MOCK_MOVIES) {
      const match = MOCK_MOVIES[genre].find((m) => m.imdbID === imdbID);
      if (match) return match;
    }
    return {
      Title: "Unknown Movie",
      Year: "N/A",
      Poster: "https://via.placeholder.com/300x450",
      Genre: "N/A",
      imdbRating: "N/A",
      Runtime: "N/A",
      Plot: "No description available.",
      Actors: "N/A",
    };
  }
  try {
    const response = await movieClient.get(`/?i=${imdbID}&plot=full&apikey=${key}`);
    return response.data;
  } catch (error) {
    console.warn("Movie details query error:", error);
    for (const genre in MOCK_MOVIES) {
      const match = MOCK_MOVIES[genre].find((m) => m.imdbID === imdbID);
      if (match) return match;
    }
    throw error;
  }
};
