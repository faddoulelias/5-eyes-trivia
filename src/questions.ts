import type { Category } from './types';

// Each category: three tiers (easy / medium / hard), three cards each.
// A match draws two random cards per tier, so boards differ between games.
export const CATEGORIES: readonly Category[] = [
  {
    id: 'geo', name: 'Geography', icon: '🌍', kind: 'qa',
    tiers: [
      [
        ['What is the capital of Japan?', 'Tokyo'],
        ['Which is the largest ocean on Earth?', 'The Pacific Ocean'],
        ['On which continent is Egypt?', 'Africa'],
      ],
      [
        ['What is the capital of Australia?', 'Canberra'],
        ['Which river carries the most water in the world?', 'The Amazon'],
        ['Which country has the most time zones, counting its overseas territories?', 'France'],
      ],
      [
        ['What is the smallest country in the world?', 'Vatican City'],
        ['What is the capital of Kazakhstan?', 'Astana'],
        ['Which African country was once known as Abyssinia?', 'Ethiopia'],
      ],
    ],
  },
  {
    id: 'history', name: 'History', icon: '🏛️', kind: 'qa',
    tiers: [
      [
        ['Who was the first person to walk on the Moon?', 'Neil Armstrong'],
        ['Which ancient civilisation built the pyramids of Giza?', 'The ancient Egyptians'],
        ['Which famous wall came down in 1989?', 'The Berlin Wall'],
      ],
      [
        ['In which year did the Titanic sink?', '1912'],
        ['Who painted the ceiling of the Sistine Chapel?', 'Michelangelo'],
        ['Which empire was ruled by Suleiman the Magnificent?', 'The Ottoman Empire'],
      ],
      [
        ['Which Phoenician city was famous for its purple dye?', 'Tyre'],
        ['In which year did Constantinople fall to the Ottomans?', '1453'],
        ['Who was the first woman to win a Nobel Prize?', 'Marie Curie'],
      ],
    ],
  },
  {
    id: 'science', name: 'Science', icon: '🔬', kind: 'qa',
    tiers: [
      [
        ['Which planet is known as the Red Planet?', 'Mars'],
        ['Which gas do plants absorb from the air?', 'Carbon dioxide'],
        ['How many legs does a spider have?', 'Eight'],
      ],
      [
        ['What is the chemical symbol for gold?', 'Au'],
        ['What is the hardest natural substance?', 'Diamond'],
        ['Which part of the cell is nicknamed its "powerhouse"?', 'The mitochondria'],
      ],
      [
        ['Which gas makes up most of Earth\'s atmosphere?', 'Nitrogen'],
        ['Roughly how fast does light travel, in km per second?', 'About 300,000 km/s'],
        ['What is the closest star to the Sun?', 'Proxima Centauri'],
      ],
    ],
  },
  {
    id: 'screen', name: 'Movies & Series', icon: '🎬', kind: 'qa',
    tiers: [
      [
        ['What is the name of the wizarding school in Harry Potter?', 'Hogwarts'],
        ['In The Lion King, who is Simba\'s father?', 'Mufasa'],
        ['Which animated film is about a clownfish searching for his son?', 'Finding Nemo'],
      ],
      [
        ['Who directed both Titanic and Avatar?', 'James Cameron'],
        ['What is the coffee shop in Friends called?', 'Central Perk'],
        ['Which series follows the Starks and the Lannisters?', 'Game of Thrones'],
      ],
      [
        ['What was Pixar\'s first feature-length film?', 'Toy Story'],
        ['Which was the first non-English-language film to win the Best Picture Oscar?', 'Parasite'],
        ['In Breaking Bad, what alias does Walter White use?', 'Heisenberg'],
      ],
    ],
  },
  {
    id: 'music', name: 'Music', icon: '🎵', kind: 'qa',
    tiers: [
      [
        ['Which band was made up of John, Paul, George and Ringo?', 'The Beatles'],
        ['Who is known as the "King of Pop"?', 'Michael Jackson'],
        ['How many strings does a standard guitar have?', 'Six'],
      ],
      [
        ['Which legendary Lebanese singer was born Nouhad Haddad?', 'Fairuz'],
        ['Who sang "Rolling in the Deep"?', 'Adele'],
        ['Which composer kept writing music after going deaf, including his Ninth Symphony?', 'Beethoven'],
      ],
      [
        ['Which Egyptian singer was known as "The Star of the East"?', 'Umm Kulthum'],
        ['Which group won Eurovision in 1974 with "Waterloo"?', 'ABBA'],
        ['In sheet music, what does "forte" mean?', 'Loud'],
      ],
    ],
  },
  {
    id: 'sports', name: 'Sports', icon: '⚽', kind: 'qa',
    tiers: [
      [
        ['How many players does a football team have on the pitch?', 'Eleven'],
        ['Which sport is played at Wimbledon?', 'Tennis'],
        ['How many rings are on the Olympic flag?', 'Five'],
      ],
      [
        ['Which country won the 2022 FIFA World Cup?', 'Argentina'],
        ['In basketball, how many points is a free throw worth?', 'One'],
        ['Roughly how long is a marathon, in kilometres?', 'About 42 km (42.195)'],
      ],
      [
        ['Which country won the very first FIFA World Cup, in 1930?', 'Uruguay'],
        ['Which Grand Slam tennis tournament is played on clay?', 'The French Open (Roland Garros)'],
        ['How many players does a volleyball team have on court?', 'Six'],
      ],
    ],
  },
  {
    id: 'food', name: 'Food', icon: '🍽️', kind: 'qa',
    tiers: [
      [
        ['What is the main ingredient of hummus?', 'Chickpeas'],
        ['Which country does sushi come from?', 'Japan'],
        ['Which fruit is guacamole made from?', 'Avocado'],
      ],
      [
        ['Which herb is the main ingredient of tabbouleh?', 'Parsley'],
        ['Which cheese traditionally tops a pizza Margherita?', 'Mozzarella'],
        ['Which layered pastry is filled with nuts and soaked in syrup?', 'Baklava'],
      ],
      [
        ['Which grain is mixed with meat to make kibbeh?', 'Bulgur (cracked wheat)'],
        ['What is the most expensive spice in the world by weight?', 'Saffron'],
        ['Which Japanese word names the savoury "fifth taste"?', 'Umami'],
      ],
    ],
  },
  {
    id: 'tech', name: 'Games & Tech', icon: '🎮', kind: 'qa',
    tiers: [
      [
        ['Which company makes the iPhone?', 'Apple'],
        ['What is the name of Mario\'s brother?', 'Luigi'],
        ['What does "WWW" stand for?', 'World Wide Web'],
      ],
      [
        ['In which game do you build with blocks and run from Creepers?', 'Minecraft'],
        ['Who co-founded Microsoft with Paul Allen?', 'Bill Gates'],
        ['What does "CPU" stand for?', 'Central Processing Unit'],
      ],
      [
        ['In which year was the first iPhone released?', '2007'],
        ['What does "HTTP" stand for?', 'HyperText Transfer Protocol'],
        ['Who is widely considered the first computer programmer?', 'Ada Lovelace'],
      ],
    ],
  },
  {
    id: 'levant', name: 'Lebanon & the Levant', icon: '🌲', kind: 'qa',
    tiers: [
      [
        ['What is the capital of Lebanon?', 'Beirut'],
        ['Which tree appears on the Lebanese flag?', 'The cedar'],
        ['What is the currency of Lebanon?', 'The Lebanese pound (lira)'],
      ],
      [
        ['Which Lebanese city is home to the Roman Temple of Bacchus?', 'Baalbek'],
        ['Which ancient city in Jordan is carved into rose-red rock?', 'Petra'],
        ['Which Lebanese-American writer wrote "The Prophet"?', 'Khalil Gibran'],
      ],
      [
        ['In which year did Lebanon gain independence?', '1943'],
        ['Which ancient Lebanese port city is linked to the origin of the word "Bible"?', 'Byblos (Jbeil)'],
        ['What kind of natural wonder is Jeita?', 'A cave system (grotto)'],
      ],
    ],
  },
  {
    id: 'emoji', name: 'Emoji Movies', icon: '🧩', kind: 'emoji',
    tiers: [
      [
        ['🦁👑', 'The Lion King'],
        ['🕷️🧑', 'Spider-Man'],
        ['❄️👸⛄', 'Frozen'],
      ],
      [
        ['🚢🧊💔', 'Titanic'],
        ['🦖🏝️', 'Jurassic Park'],
        ['👻🚫', 'Ghostbusters'],
      ],
      [
        ['🐀👨‍🍳🇫🇷', 'Ratatouille'],
        ['💍🌋🧙', 'The Lord of the Rings'],
        ['🃏🦇🌃', 'The Dark Knight'],
      ],
    ],
  },
  {
    id: 'blank', name: 'Finish the Line', icon: '✍️', kind: 'blank',
    tiers: [
      [
        ['"A picture is worth a thousand ____."', 'Words'],
        ['"Rome wasn\'t built in a ____."', 'Day'],
        ['"May the ____ be with you."', 'Force'],
      ],
      [
        ['"To be, or not to be, that is the ____."', 'Question'],
        ['"Houston, we have a ____."', 'Problem'],
        ['"I think, therefore I ____."', 'Am'],
      ],
      [
        ['"The only thing we have to fear is ____ itself."', 'Fear'],
        ['"That\'s one small step for man, one giant ____ for mankind."', 'Leap'],
        ['"Float like a butterfly, sting like a ____."', 'Bee'],
      ],
    ],
  },
  {
    id: 'charades', name: 'Charades', icon: '🎭', kind: 'charades',
    tiers: [
      [
        ['Act it out', 'Brushing your teeth'],
        ['Act it out', 'Swimming'],
        ['Act it out', 'Riding a horse'],
      ],
      [
        ['Act it out', 'Taking a selfie'],
        ['Act it out', 'Making coffee'],
        ['Act it out', 'Stuck in traffic'],
      ],
      [
        ['Act it out', 'Changing a flat tyre'],
        ['Act it out', 'Parallel parking'],
        ['Act it out', 'A goalkeeper saving a penalty'],
      ],
    ],
  },
];

export const byId = (id: string): Category => {
  const c = CATEGORIES.find((x) => x.id === id);
  if (!c) throw new Error(`Unknown category ${id}`);
  return c;
};
