// imports
import { submitScore, loadLeaderboard } from "./leaderboard.js";
import { initTheme } from "./theme.js";

const quotesData = [
  { text: "A price is always exacted for what fate bestows, isn’t that so?", name: "Adam" },
  { text: "Can you accept such an outcome?", name: "Adam" },
  { text: "We meet again, Mysteries.", name: "Adam" },
  { text: "It was a necessary sacrifice.", name: "Adam" },
  { text: "I am One, and also Infinity. The Beginning, and the End.", name: "Adam" },
  { text: "To him, there’s something more important than life.", name: "Adam" },
    { text: "I believe that monkeys are a better choice than the present ministers. […] After all, monkeys only need to eat, sleep, and mate. They would not come up with foolish ideas and insist on brainless projects.", name: "Alger Wilson" },
  { text: "It’s not that things happen wherever The World is, but that The World and the other Blessed will appear when something is about to happen!", name: "Alger Wilson" },
  { text: "This is really a suitable person to use as a reason… “He” wouldn’t appear to defend himself, and even if “He” did, no one would believe it…", name: "Alger Wilson" },
  { text: "There’s no point lying about matters that can be easily exposed. I shouldn’t jeopardize the possible transactions in the future just for some petty gains… At times, honesty is the best policy…", name: "Alger Wilson" },
  { text: "Patience is an important premise when dealing with many situations… Only by being able to curb your urges and irascibility will you be able to avoid danger to the greatest extent… At times, tolerance is very important…", name: "Alger Wilson" },
  { text: "The traces you left behind might not vanish for the next few centuries or even millennia.", name: "Alger Wilson" },
  { text: "Even Gehrman Sparrow can’t stand my singing. How should I act as an Ocean Songster…", name: "Alger Wilson" },
  { text: "Since the old gods are fading away and new gods are rising, Mr. Fool will be returning to “His” throne in the astral world. Then why shouldn’t I consider being an angel? Only at this level can I complete a qualitative change in my existence. I’ll be able to live a long lifespan. Only then can I lord over people and lead a large-scale organization. I’ll wield authority over the world!", name: "Alger Wilson" },
  { text: "Are you willing to remain on the ship as cowards, or do you want to follow me into battle as a hero to show your devotion to the Lord?", name: "Alger Wilson" },
  { text: "Since you can’t change the outcome of the matter at the moment, then try your best to improve yourself, obtain more power, and wield more authority until, one day, you can participate in the gambling. If you die during this process, it’s better than not doing anything.", name: "Alger Wilson" },
  { text: "To Mr. Fool, the most important thing is the believers here, not these islands. To the City of Silver, the most important thing is the people, not the city. As long as you can protect Mr. Fool’s believers and protect the citizens of the City of Silver, migrating them away in time. Even if we lose Bayam, the New City of Silver, and the Rorsted Archipelago, we can rebuild a new city elsewhere and rebuild a new home. Remember, don’t lose sight of the forest for the trees.", name: "Alger Wilson" },
{ text: "A Bizarro Sorcerer of Evernight.", name: "Amon" },
  { text: "I’m not a Beyonder of the Tyrant Pathway, so I wouldn’t be so rash as to directly steal your destiny. Heh heh, I suddenly have a feeling that directly replacing you would result in something I don’t wish to see happening.", name: "Amon" },
  { text: "Pallez, it’s already 1350 of the Fifth Epoch. The technique of relying on the gathering of avatars to raise one’s level is already outdated.", name: "Amon" },
  { text: "Don’t ask us why we’re taking such risks. Life often requires some excitement, joy, and anticipation.", name: "Amon" },
  { text: "Humans nowadays are really lacking in creativity. They go to cathedrals at the first sight of problems. I thought I would discover something if I followed her. Next time, I’ll steal the cathedral in front of them.", name: "Amon" },
  { text: "No, but I often bring up philosophical problems for others, just like who I am, where I am, and what’s my future.", name: "Amon" },
  { text: "My prey will only be Pallez, Lil’ Zaratul, and ‘Door.’ The rest will purely depend on my mood.", name: "Amon" },
  { text: "Are you really not considering becoming my Blessed?", name: "Amon" },
  { text: "Next time, if I encounter ‘Him,’ I’ll disguise myself to look like you, and then I’ll wear a monocle in front of ‘Him’ again.", name: "Amon" },
  { text: "I’ve always respected the gods.", name: "Amon" },
  { text: "In theory, my believers are all ‘me.’ I don’t need to trouble myself with building an idol.", name: "Amon" },
  { text: "Sorry, I wore it on the wrong side.", name: "Amon" },
  { text: "Give up. I have a way to deal with it. I’ll let you sleep and let you get the peace you want.", name: "Amon" },
  { text: "Doing something that doesn’t match your expectations is also a form of deception.", name: "Amon" },
  { text: "You're crazy.", name: "Amon" },
  { text: "I plan to leave this place and enter the cosmos. That place is much more exciting than the real world. Perhaps I’ll understand the two things you mentioned as a result of this.", name: "Amon" },
   { text: "It’s faith towards the Goddess, but for The Fool, it’s worship.", name: "Audrey Hall" },
  { text: "Every “famous detective” needs a good assistant.", name: "Audrey Hall" },
  { text: "Father, from what you just said, it sure was a horrible but funny scene. I hope that the eyewitness won’t have nightmares because of it.", name: "Audrey Hall" },
  { text: "In the future, there will also be an informant from the Tarot Club inside the Psychology Alchemists.", name: "Audrey Hall" },
  { text: "Does Mr. Fool wish to get the title of 'The Nemesis of Evil Gods'? Audrey, how can you do this? How can you use Mr. Fool as a joke…", name: "Audrey Hall" },
  { text: "The death of Duke Negan has made me understand that the world isn’t as stable and peaceful as I thought it was. I want to have the power to protect all of you at critical moments…", name: "Audrey Hall" },
  { text: "It has to be said that it’s actually quite terrifying, just like monsters in the legends, who can grasp your minds…", name: "Audrey Hall" },
  { text: "I have to say that Susie’s existence has effectively raised my motivation to learn, as well as how strictly I handle matters… I can’t be inferior to a dog! But, being better than this dog doesn’t seem to be something worthy of praise…", name: "Audrey Hall" },
  { text: "Audrey, you were that naive and immature back then! Thankfully, you met Mr. Fool. If it were any other secret existence, you would’ve long gone mad or turned into a monster! Mr. Fool is such a nice man! No, such a nice orthodox god!", name: "Audrey Hall" },
  { text: "The consultation fee that I charge isn’t much at all. Yeah, wish me happiness!", name: "Audrey Hall" },
  { text: "Is the supernatural world always this cruel and terrifying, or is it just occasionally?", name: "Audrey Hall" },
  { text: "Under the premise of knowing how cruel and terrifying the mysterious world is, the me from last June would’ve given up being a Beyonder. But the me of this year wouldn’t. This might be the price of growing up.", name: "Audrey Hall" },
  { text: "Mr. Star really is laid-back, and his hair is combed very casually. It’s such a pity. Otherwise, with his looks, he can be a model on the covers of magazines…", name: "Audrey Hall" },
  { text: "I understand what you mean. There are many times when you can’t do what you want while ensuring absolute safety. You can only choose one of them.", name: "Audrey Hall" },
  { text: "Ever since I became a Spectator, I’ve always displayed what would be the most acceptable side to them in front of others, taking care of their most delicate emotions. This isn’t a bad thing, but this way, I won’t be able to know what I really look like in the eyes of others. I won’t be able to unveil the gorgeous clothes and see the rotting flesh beneath me. I won’t be able to figure out the problem. Recently, I’ve been trying to show my true state in some details. I want to see how the people around me will react under such a situation. I want to see if they still think that I’m the kind, amiable, and virtuous young lady.", name: "Audrey Hall" },
    { text: "Some people are… special. They are born with some strange ability. I think I am someone like that.", name: "Azik Eggers" },
  { text: "I don’t know any other person with extraordinary powers… You cannot imagine what emotions a man without a past has. You are like a boat floating in a vast ocean. The most terrifying thing is not facing a storm, but not being able to find a harbor. The inability to navigate to shore. All you can do is take on disaster after disaster, with no end in sight, never to feel peace and safety.", name: "Azik Eggers" },
  { text: "Were you afraid that I would become an evil person like a Demoness after fully recovering my memories? … I’m also very worried. But, I have a greater desire for discovering myself.", name: "Azik Eggers" },
  { text: "Sleep isn’t a bad thing either. At least I’ll have dreams. In my dreams, I never left, accompanying her while taking in the sun while guiding that stubborn son of mine to use the broadsword. I’ll also make a swing for that little kid that loves to wheedle…", name: "Azik Eggers" },
  { text: "From the beginning, you've been a guardian. You mimicked others until you were mimicked by others.", name: "Azik Eggers" },
  { text: "You seem to still be asleep, but it doesn’t matter. I’ll write to tell you about the interesting things that I’ve encountered, the interesting traditions, and interesting people. I think I should be able to send these letters to you via sacrifice…", name: "Azik Eggers" },
  { text: "Is this my destiny, Your Majesty?", name: "Cattleya" },
  { text: "The Hidden Sage is an embodiment of knowledge itself. \"He\" is chasing us—every single Moses Ascetic Order member. When too much knowledge is injected into us, without us being able to quickly digest and master it, a situation like before would happen. Either I lower my defenses and open my mind to accept the modifications from the Hidden Sage, or I would tenaciously resist it or end up losing control.", name: "Cattleya" },
  { text: "She taught me, and she held me by the hand as we adventured. She watched me grow up. To me, she’s my captain and my teacher, as well... as well as my mother...", name: "Cattleya" },
  { text: "This is one of the nine Sefirot. Mr. Fool’s goal is to gather all the sefirot and attempt to recover…", name: "Cattleya" },
  { text: "If you don’t return, I would do the same.", name: "Cattleya" },
  { text: "Then face it.", name: "Cattleya" },
  { text: "No, there won’t be any sweet dreams tonight. I have to rush back to Backlund. This isn’t a happy experience, it’s like having a relationship with someone you don’t like…", name: "Daly Simone" },
  { text: "If I had caught Lanevus, I would let him know that men can be weak too! I would make sure that a cold, rotten, yet stiff corpse would be situated behind his buttocks. I would make sure that a pungent white bone filled with thorns would be situated in front of him. I’d make it so that those cold little fellows enter and leave his body wherever they can!", name: "Daly Simone" },
  { text: "Humans are fragile creatures, and they need a certain amount of time to calm down. No one can always be in peak condition, enjoying the thrill and pleasure without any rest.", name: "Daly Simone" },
  { text: "It’s like I’m already in bed with everything in place, only to realize that there aren’t any condoms at home. Worst of all, it’s late at night, and most of the stores around the neighborhood have closed for the day!", name: "Daly Simone" },
  { text: "Your eyes and bearing resembles a friend of mine, especially the eyes.", name: "Daly Simone" },
  { text: "I was wrong. I failed to do anything in time. Today, I’m not having it repeat again…", name: "Daly Simone" },
  { text: "I don’t want to become a monster…", name: "Daly Simone" },
    { text: "I don’t care if you’re God or The Fool, my prayers will not change. I hope that the people of the City of Silver will be freed from the curse of their destinies. I hope that the sun and sky described in the books will appear in our skies. If possible—if possible, I wish that my parents can be revived.", name: "Derrick Berg" },
  { text: "So, I want to be the Sun… When there was a Sun shining over the land, we had never encountered any curse.", name: "Derrick Berg" },
  { text: "Yes, we believe that we will regain the Lord’s favor in the end. Perhaps, it will be on the day the sun rises again. We were once ruled by the giants’ royal family, and we worshiped the Giant King Aurmir. Later, we were saved by the Lord and we will never betray the Lord again.", name: "Derrick Berg" },
  { text: "Did the Lord not abandon us? It’s just that “He” had gone mad.", name: "Derrick Berg" },
  { text: "My faith lies only with Mr. Fool!", name: "Derrick Berg" },
  { text: "Mr. World, do you need to bring some food with you? There are mushrooms that can produce milk!", name: "Derrick Berg" },
{ text: "Reintroducing myself, Nighthawk, Dunn Smith.", name: "Dunn Smith" },
  { text: "The founder of the Nighthawks, Archbishop Chanis, once said, ‘We are guardians, but also a bunch of miserable wretches that are constantly fighting against dangers and madness.'", name: "Dunn Smith" },
  { text: "Also, Beyonders are not as powerful as you imagine them to be, especially a low-Sequence Beyonder. Heh, why would we use 1 to represent the highest grade and 9 the lowest? Isn’t this against intuition and logic?", name: "Dunn Smith" },
  { text: "You must understand that once you consume the potion, there will be no room for regret.", name: "Dunn Smith" },
  { text: "You have to remember that curiosity killed the cat. It can also kill Beyonders. Do not attempt to probe the murmurings you should not be listening or see existences you should not see.", name: "Dunn Smith" },
  { text: "I hoped to continue fighting with them, to continue dealing with the monsters in the darkness, to deal with the crazy heretics, to protect Tingen City with them. Thus, I chose to consume their remains.", name: "Dunn Smith" },
  { text: "They’re still with me in my dreams. Adelaide loves to read, and he often reads at the solarium. He often tells me to discipline Rozanne and get her to mature faster, to the point that Rozanne complains about me becoming more and more like her father and has become scared of me. Hitte is a person who cannot sit still and has to hunt in the forest every day. Dwayne always stands by the window of her bedroom and watches us chat. Kenley, who recently joined, created his own seven-string guitar and sings while strumming it… I really miss them.", name: "Dunn Smith" },
{ text: "What’s wrong with being a vampire? Do you think vampires should be locked up here? Do I have to listen to your nagging and scripture recitals every day? Bullshit, I’m a noble Sanguine, so don’t use such a vulgar name to describe me!", name: "Emlyn White" },
  { text: "I only like puppets and pure, beautiful girls!", name: "Emlyn White" },
  { text: "Those fellows are really disgraceful. As noble Sanguine, they should sleep in coffins or stay in their own rooms. Why are they mimicking humans and holding all kinds of gatherings? There’s even dancing!", name: "Emlyn White" },
  { text: "Being a believer because I like ‘Her’ beliefs is completely different from being forcefully turned into a believer through a psychological cue. Even if I do abandon the moon one day and believe in Mother Earth, I also hope that it is a choice that I freely made. It has nothing to do with others; this is the last pride of a Sanguine.", name: "Emlyn White" },
  { text: "If I really choose to make the attempt, it’s definitely not for myself, but for all Sanguine! Resolving this problem is just an additional perk!", name: "Emlyn White" },
  { text: "There are indeed differences between professional researchers and amateur enthusiasts, but from this week onwards, I, Emlyn White, would be a professional researcher… Baron Waymandy has never mentioned anything related to the City of Silver, so I can’t ask him directly. As the secret messiah of the Sanguine who is burdened with secrets, I have to be careful in such matters… Attending class for half a day and going to the cathedral for half a day before accompanying the dolls at night seems to be a pretty good life…", name: "Emlyn White" },
  { text: "One day, I will become a Sanguine Marquis like Lord Nibbs! No, a duke, or even a prince! Only by doing so will I be able to shoulder the responsibility of being the Sanguine’s messiah… Yes, the baron’s remains is only about four thousand pounds; I’ll have a lot of money left. I can even buy a few more dolls and give them some new clothes…", name: "Emlyn White" },
  { text: "Ahem [...] Ma’am Hermit, I have to emphasize that it’s Sanguine, not Vampire. Heh heh, I won’t object it if you call those humans who consume the characteristics of my kinsmen vampires. I would even be very agreeable to it.", name: "Emlyn White" },
  { text: "This should be why us Sanguine are very handsome and beautiful.", name: "Emlyn White" },
  { text: "I’m very confident in my intelligence.", name: "Emlyn White" },
  { text: "I’m already very humble. I didn’t mention I would become a Duke or even a Prince… How am I to be the Sanguine’s messiah without being an angel?", name: "Emlyn White" },
  { text: "The dark, silent environment is still alright, but it’s just a little cold… But without dolls, newspapers, books, and historical documents, this life is meaningless… Besides, the Nighthawks provide me with cow blood, and it tastes nasty. The effects aren’t too good either. I’m already becoming weak…", name: "Emlyn White" },
{ text: "Also, I think that risking my life to save her is not a good idea. Life is short, but there is much for us to do.", name: "Fors Wall" },
  { text: "Life is short. There are too many things that we need to do, why must we waste our time on such uninteresting, menial tasks?", name: "Fors Wall" },
  { text: "This is even more than the royalties I’ve received for my ‘Stormwind Mountain Villa’ so far… Should I praise Miss Audrey or laugh at the poverty of an author?", name: "Fors Wall" },
  { text: "If only I could understand what the murmurs are saying… I wish to die in the know, and not be buried clueless…", name: "Fors Wall" },
  { text: "This reminds me of a saying. You may not look directly at God…", name: "Fors Wall" },
  { text: "Only fairytales or novels would make such daring descriptions! And the author has to smoke cannabis and be in a state of psychotic madness in order to create such a city…", name: "Fors Wall" },
  { text: "Why is it that all we talk about at the Tarot Club is the descent of the True Creator, the awakening of the Primordial Demoness, and the reappearance of a King of Angels? I’m only a Sequence 9!", name: "Fors Wall" },
  { text: "Don’t you know I have a severe case of procrastination?", name: "Fors Wall" },
  { text: "Nobles and tycoons are truly terrifying.", name: "Fors Wall" },
  { text: "Mr. World wishes to take this mission? That’s right. He’s in Backlund. But this is an investigation, not a murder. Dwayne Dantès is already pitiful enough. Leave Dwayne alone!", name: "Fors Wall" },
  { text: "I just realized today that Mr. Fool is the most important man in my heart. Uh, a ‘Him.’", name: "Fors Wall" },
{ text: "Free things cost the most.", name: "Klein Moretti" },
  { text: "The oldest and strongest emotion of mankind is fear, and the oldest and strongest fear is the fear of the unknown.", name: "Klein Moretti" },
  { text: "A true professor can communicate with people gently and politely, but he can also educate the other person using the principles of physics by raising a cane to convince someone when there is an obstacle in communication.", name: "Klein Moretti" },
  { text: "Phew, looks like I’ve managed to trick another person into becoming a member. No, I’ve managed to recruit another member…", name: "Klein Moretti" },
  { text: "Those who know nothing fear nothing, but those who don’t court death won’t die… In the future, I can’t just divine anything and everything. Who knows what I’ll see!", name: "Klein Moretti" },
  { text: "Fate never repeats itself indefinitely. It always brings us some surprises.", name: "Klein Moretti" },
  { text: "Knowledge can change one’s destiny, and diligence will result in glory.", name: "Klein Moretti" },
  { text: "I have no idea what I am now. Maybe I’m just an evil spirit that has clawed its way back from hell to seek revenge…", name: "Klein Moretti" },
  { text: "I don’t have any chance of survival if I don’t gamble. There’ll be that sliver of hope if I gamble on it. I won’t sit back and wait for death.", name: "Klein Moretti" },
  { text: "A prepared Magician and an unprepared Magician are very different concepts…", name: "Klein Moretti" },
  { text: "He has made every Sequence in his own image. What a narcissist... I’m suddenly very curious what the Card of Blasphemy for the Demoness pathway would look like. Hehe.", name: "Klein Moretti" },
  { text: "Captain, now it’s my turn to approve the expense claims of others…", name: "Klein Moretti" },
  { text: "Life is full of hard choices...", name: "Klein Moretti" },
  { text: "I always placed safety first and made sure to be careful so that I wouldn’t be affected mentally because of the allure of wealth. However, in order to take revenge, I have to advance, and advancing requires me to buy expensive Beyonder ingredients. I can only accumulate every single penny and save whatever I can…", name: "Klein Moretti" },
  { text: "A doll ruins one’s life, consuming potions bankrupts you for three generations.", name: "Klein Moretti" },
  { text: "Unfortunately, it’s not possible to add a line in the Ten Commandments about “boldly and confidently seek funding”; that would damage the image of Sea God…", name: "Klein Moretti" },
  { text: "A person should be rash when the time calls for it, and be a coward when necessary!", name: "Klein Moretti" },
  { text: "I never expected that a navy admiral who enjoys a high standing, a demigod saint, would still be faced with such helpless and painful experiences… Strength can bring abundance, but it’s not a solution to everything… Everyone wears masks, and this is the truest side of a demigod…", name: "Klein Moretti" },
  { text: "A person who’s very sentimental; A person from Earth, but to a certain extent, a person who has been reconstructed into a new person because of the fusion with Klein Moretti’s memory fragments; A person who didn’t spend too much time with the Nighthawks but has had that period of time deeply influence his actions and choices; A person who tries to play safe and is afraid of danger but is able to change his mind at the critical moment; A person who truly wants to skive, eat delicious food, travel, and enjoy life, but he has no choice but to be busy with more important matters; A person who likes beautiful women, but he doesn’t give himself up to pleasure to keep to his principles; A person who loves money but is willing to spend large sums of money for his siblings; A person who hides his pain inside while showing a smile to others; A person who’s used to lampooning inwardly but appears gentlemanly on the surface; A person who can overcome his psychological traumas but never crosses his bottom line; A person who feels embarrassed for his acting; He’s also a guardian, a miserable wretch that is constantly fighting against threats and madness!", name: "Klein Moretti" },
  { text: "This is really a crazy and chaotic world…", name: "Klein Moretti" },
  { text: "Death is not the end. You will be redeemed when you are at god’s side.", name: "Klein Moretti" },
  { text: "This lady actually looks pretty good. She’s dignified and pretty. She should’ve been the star at this ball, with people yearning to invite her to a dance. However, the way she exudes that look of arrogance, looking down at people with a supercilious look, makes any gentleman who casts his eyes on her shift over to another target. I’ve seen this look in the eyes of certain Beyonders as well. They no longer think of themselves as mortal, and they often have a sense of superiority when facing ordinary folks… Heh heh, this implies that Miss Hazel is likely a Beyonder… That’s right, if she isn’t a Beyonder, how would she dare to loiter in the sewers… She’s from the Marauder pathway? But how is she to act as a Marauder or Swindler with such arrogance? It’s hard to imagine…", name: "Klein Moretti" },
  { text: "As expected of myself… To know the soft spots in my heart and which are the most effective ways to plea… However, I’ve already come to know who I am. I’m Zhou Mingrui who has fused with Klein’s memories and emotions. If I were to let you go, it would be equivalent to splitting the two up, admitting that they are opposing parties. That way, I’ll immediately lose control once I return to the real world…", name: "Klein Moretti" },
  { text: "Others charge people money to sing, but Mr. Hanged Man’s singing charges you with death!", name: "Klein Moretti" },
  { text: "One stops worrying when there are too many debts. Perhaps it might create opportunities and let my debtors end up fighting…", name: "Klein Moretti" },
  { text: "Heh, Creeping Hunger, you are swelling in self-importance again. You need to reflect on yourself above the gray fog later.", name: "Klein Moretti" },
  { text: "This shows that face is something you buy with money…", name: "Klein Moretti" },
  { text: "Is this decidophobia? It also gives the strong vibes of a charlatan…", name: "Klein Moretti" },
  { text: "A price is always exacted for what fate bestows, isn’t it?", name: "Klein Moretti" },
  { text: "Why? Isn’t dealing with Beyonders on the brink of losing control or those who have lost control the duty of a Nighthawk?", name: "Klein Moretti" },
  { text: "Cold? Then I’ll directly press the Unshadowed Crucifix against your head! If you don’t want your Beyonder characteristic, donate it to the people who need it!", name: "Klein Moretti" },
  { text: "Even if it’s meaningless, some things still ought to be done.", name: "Klein Moretti" },
  { text: "Fellow Earthling, your two children have really caused me so much pain… If only they were all like Bernadette…", name: "Klein Moretti" },
  { text: "Uh, that Chief wishes to receive Mr. Fool’s blessings? Mr. Fool also needs some blessings right now…", name: "Klein Moretti" },
  { text: "Perhaps, I’ve never left my hometown, but I will never be able to return home…", name: "Klein Moretti" },
  { text: "Although I’m also a Seer, I still have to say that, in terms of horror, terror, and bizarreness, our pathway is definitely ranked amongst the top three…", name: "Klein Moretti" },
  { text: "I'm just a Historical Void projection. There's nothing to be afraid about... I won't suffer any losses from praying, but what if the Lord of Storms hears about the Amon situation and decides to bestow 0-32 to me? That way, I won't have to risk hunting the Dark Demonic Wolf... A person should always be hopeful!", name: "Klein Moretti" },
  { text: "If you don't want to give it to me, so be it... But why did you kill my marionette...", name: "Klein Moretti" },
  { text: "Regardless of whether it was a Grade 0 Sealed Artifact or not, head over there to be quarantined and get a hold of yourself!", name: "Klein Moretti" },
  { text: "As long as everyone sends out as much light as the heat inside them, it might bring some hope.", name: "Klein Moretti" },
  { text: "In this world, nothing can be easily resolved without taking risks. Sometimes, I do something with the thought that ‘death is a possibility.’", name: "Klein Moretti" },
  { text: "Nobility is in your character, not status.", name: "Klein Moretti" },
  { text: "If I wanted to give you my blessings, I wouldn’t have said that. I would have said, I hope that you will still love your family and friends after seeing them as they are.", name: "Klein Moretti" },
  { text: "Always remember you are a he, not a ‘He.'", name: "Klein Moretti" },
  { text: "I can call myself the ruler of the beauty industry, the guardian of architects and the construction workers, the miracle creator of long-distance travel…", name: "Klein Moretti" },
  { text: "Miracles are only for a moment, but fate is often a long-lasting event.", name: "Klein Moretti" },
  { text: "That’s right, other than his low level, Frank’s usual actions resemble more of an evil god than me…", name: "Klein Moretti" },
  { text: "He smiles like a curly-haired baboon…", name: "Klein Moretti" },
  { text: "You're not half-mad at all.", name: "Klein Moretti" },
  { text: "I won't lose too much, just myself. There are always some things that are more important than others.", name: "Klein Moretti" },
  { text: "This is my choice. I had anticipated this day a long time ago. I will finally face \"Him\".", name: "Klein Moretti" },
 { text: "I'm considering asking Captain's permission to apply for a Feynapotter lute. How can there not be an accompaniment when singing? Heh heh, I'm just kidding.", name: "Leonard Mitchell" },
  { text: "Don’t mind it. There are many special people in this world that can always do things others can’t, such as you... and me.", name: "Leonard Mitchell" },
  { text: "Sigh, every time I recall this, it seems like I'm touching the dust heaps of history. The poet in me stirs when thinking of this irreversible and fated destiny, but alas, I do not know how to compose the poem.", name: "Leonard Mitchell" },
  { text: "I’m very sorry, your brother Klein died at the hands of an evil criminal while he was trying to save others. He’s a hero, a true hero.", name: "Leonard Mitchell" },
  { text: "He’s overtaken me by leaps and bounds…", name: "Leonard Mitchell" },
  { text: "Everyone here isn’t to be trifled with… Is this what’s called a gathering of protagonists?", name: "Leonard Mitchell" },
  { text: "Little Sun? How is he “little”? That fellow is clearly taller and larger than me...", name: "Leonard Mitchell" },
  { text: "This means that the organization that uses the tarot cards as code names has officially stepped onto the stage of history. Heh heh, please forgive me for using poetic words.", name: "Leonard Mitchell" },
  { text: "Didn’t you really want to ask why the Black Emperor’s mausoleum has to be engraved with the order one implemented and the style that one ushered? In fact, this wasn’t necessary. I just wanted to let anyone who sees it remember my greatness…", name: "Roselle Gustav" },
  { text: "I originally planned on asking where you’re from to see there’s any need for regional discrimination, but after some thought, there’s no need for that. We’re all anachronistic miserable wretches without a home.", name: "Roselle Gustav" },
  { text: "The longer I lived, the higher the frequency I felt this feeling. It’s like the fallen leaves will always want to return to the roots of a tree. However, at the very least, I have a daughter, a wife, and two sons. There are still many things in this world that I’m worried about, and some sense of belonging to a certain extent. As for you… I can feel your loneliness, the loneliness that comes from deep within your bones.", name: "Roselle Gustav" },
  { text: "The taste of demoenss ain't that bad", name: "Roselle Gustav" },
{ text: "I’m an innocent person who was harmed because of Alista Tudor’s ambition. Due to the constraints of my corpse, I’ve been trapped in that underground ruin for nearly two thousand years.", name: "Sauron-Einhord-Medici" },
  { text: "A member of the Tudor bloodline sure is delicious; it’s really intoxicating. It will allow my loathing to exceed its limits to the greatest extent, and it will help me temporarily expand the boundary of the seal.", name: "Sauron-Einhord-Medici" },
  { text: "Medici, have you sacrificed your brain to the True Creator?", name: "Sauron-Einhord-Medici" },
  { text: "Your tricks are so childish that they look like a three-year-old’s! Haha, the secret hidden by the Loen royal family is very simple. I could guess it just by reading the newspapers. Tsk, you only have a smart-looking face. Your brain is filled with squirming worms.", name: "Sauron-Einhord-Medici" },
  { text: "I’ll say it again. You have talent in being a Provoker.", name: "Sauron-Einhord-Medici" },
  { text: "Primordial really is a twisted fellow. Letting a pure woman take the path of a Demoness would be so much better; however, generation after generation, you pass the damage down. And for what? Isn’t the main goal merely to seek revenge on fate?", name: "Sauron-Einhord-Medici" },
  { text: "How does it feel like to become someone else’s prey? The mighty God of War, the Red Angel beside the Creator?", name: "Sauron-Einhord-Medici" },
  { text: "- What I’m most fond of is to mix in a truth or two every few bluffs, allowing me to wait for fellows who think they’ve seen through my disguise to step into a trap. It’s just like the mistakes you two idiots made back then. - But you were the first to die - That means I’m the strongest, worthy of having the most attention!", name: "Sauron-Einhord-Medici" },
  { text: "Yo, Lil’ Raven, have those feathers I burnt recovered?", name: "Sauron-Einhord-Medici" },
  { text: "That’s because ‘He’ wishes others to call ‘Him’ as him, and not ‘Him.’", name: "Sauron-Einhord-Medici" },
  { text: "- After absorbing this Beyonder characteristic, you’d better stay away from Bansy. If you wish to grow breasts and have your body swell up, you can continue staying there. - Isn’t this something you both wish for?", name: "Sauron-Einhord-Medici" },
  { text: "In your mind, what does a witch look like?", name: "Trissy" },
  { text: "Can you imagine? Being someone who loves those shy and cute maids, can you imagine the pain when I wake up in the morning in the arms of a naked man?", name: "Trissy" },
  { text: "You sure know a lot… Did you know that I was once a man, and that my real name is Tris?", name: "Trissy" },
  { text: "I’ve already sold my soul to an evil god. The only meaning to life is vengeance.", name: "Trissy" },
  { text: "Suicides can be different. Some people do it willingly; others are forced.", name: "Trissy" },
  { text: "With one more person knowing, there might be one more chance of a solution presenting itself. Even if the chances are slim, it’s better than nothing.", name: "Trissy" },
  { text: "Those are evil thoughts they had to begin with. It has nothing to do with you. Even without you, those evil thoughts will erupt at specific moments and situations.", name: "Trissy" },
  { text: "The mastermind behind those matters is George III. His goal is to become the Black Emperor. Are you interested in stopping this matter?", name: "Trissy" },
  { text: "For the sake of a little indignation, I’ve actually gone this far… You’re lucky. At least I’ll avenge you… And if I die, apart from those who hate me, no one will remember me…", name: "Trissy" },
{ text: "Doctor, your luck will get worse.", name: "Will Auceptin" },
  { text: "Haha, I’ll reveal my cards. I have long discovered that you can resist my prophetic senses. Perhaps you can use it to seal it.", name: "Will Auceptin" },
  { text: "Why don’t you come in for a cup of tea?", name: "Will Auceptin" },
  { text: "Do you think that’s realistic? Not only are you getting a newborn to write a letter to you, he still needs to hold a ritual and summon a messenger? [...] The laws of nature still need to be respected!", name: "Will Auceptin" },
  { text: "[Klein]: Ahem. Congratulations on being born.", name: "Will Auceptin" },
  { text: "[Will]: You should say that to my parents!", name: "Will Auceptin" },
  { text: "What’s the point in having such gifts? You might as well give me Gwadar. At the very least, that can be drunk!", name: "Will Auceptin" },
  { text: "Life is just so hard…", name: "Will Auceptin" },
  { text: "Backlund really isn’t suitable for children to live in!", name: "Will Auceptin" },
  { text: "I’m really unlucky… It must’ve been that silly snake, Ouroboros, who took too much of my luck…", name: "Will Auceptin" },
  { text: "Yes, I have a Blessed who is an outstanding gourmet. He has a desire to taste ice cream from the various noble families, so as to determine the most delicious one.", name: "Will Auceptin" },
  { text: "Giving me fake ice cream isn’t equivalent to fooling fate.", name: "Will Auceptin" },
  { text: "I have a feeling that the next opportunity will be better. [...] No, it’s a blessing.", name: "Will Auceptin" },
 { text: "500 pounds just to seek out other Beyonders in our names while maintaining it a secret… Miss Audrey is the most generous and beautiful lady I’ve ever seen!", name: "Xio Derecha" },
  { text: "I’m usually popular with animals… For example, mosquitoes…", name: "Xio Derecha" },
  { text: "Isn’t he afraid that others would report him? It’s no wonder the gentleman from MI9 said that the Aurora Order is filled with lunatics, that there’s no way to understand their actions with the logic of the average person…", name: "Xio Derecha" },
  { text: "Does every author have a sickness of procrastination?", name: "Xio Derecha" },
  { text: "If not for this, do you think we can avoid the torrent of fate?", name: "Xio Derecha" },
];



const characters = [
    { name: "Adam" }, { name: "Alger Wilson" }, { name: "Alista Tudor" }, 
    { name: "Alzuhod" }, { name: "Amon" }, { name: "Anderson Hood" }, 
    { name: "Antigonus" }, { name: "Arianna" }, { name: "Audrey Hall" }, 
    { name: "Azik Eggers" }, { name: "Bernadette Gustav" }, { name: "Bethel Abraham" }, 
    { name: "Cattleya" }, { name: "Chained God" }, { name: "Colin Iliad" }, 
    { name: "Cohinem" }, { name: "Daly Simone" }, { name: "Danitz Dubois" }, 
    { name: "Derrick Berg" }, { name: "Dorian Gray Abraham" }, { name: "Dunn Smith" }, 
    { name: "Emlyn White" }, { name: "Eternal Blazing Sun" }, { name: "Evernight Goddess" }, 
    { name: "Flegrea" }, { name: "Fors Wall" }, { name: "Frank Lee" }, { name: "Frye" }, 
    { name: "God of Combat" }, { name: "God of Knowledge and Wisdom" }, { name: "Hidden Sage" }, 
    { name: "Hermes" }, { name: "Ince Zangwill" }, { name: "Katarina Pelle" }, 
    { name: "Klein Moretti" }, { name: "Lenevus" }, { name: "Leonard Mitchell" }, 
    { name: "Lilith" }, { name: "Lord of Storms" }, { name: "Lovia Tiffany" }, 
    { name: "Maric" }, { name: "Medici" }, { name: "Mobet Zoroast" }, 
    { name: "Old Neil" }, { name: "Ouroboros" }, { name: "Pallez Zoroast" }, 
    { name: "Reinette Tinekerr" }, { name: "Roselle Gustav" }, { name: "Sasir" }, { name: "Sauron-Einhord-Medici" },
    { name: "Siatas" }, { name: "Snowman" }, { name: "Sharron" }, 
    { name: "Soniathrym" }, { name: "Suah" }, { name: "Susie" }, 
    { name: "Trissy" }, { name: "Will Auceptin" }, { name: "Xio Derecha" }, 
    { name: "Zaratul" }
];
function todayKey() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function dailyDoneKey() {
  return `lotmdle_quote_daily_done_${todayKey()}`;
}

function isDailyDone() {
  return localStorage.getItem(dailyDoneKey()) === "1";
}

function setDailyDone() {
  localStorage.setItem(dailyDoneKey(), "1");
}

function dailyIndex(key, size) {
  let h = 0;
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) >>> 0;
  return h % size;
}

// infinite save
function infSaveKey() {
  return "lotmdle_quote_inf_save_v1";
}

function saveInfiniteState() {
  if (mode !== "infinite") return;
  if (!currentQuote) return;

  const rows = Array.from(grid?.children || []);
  const guesses = rows.map((row) => {
    const cell = row.querySelector(".cell");
    return {
      text: cell?.textContent || "",
      cls: cell?.className || "cell",
    };
  });

  const payload = {
    quoteText: currentQuote.text,
    answerName,
    attempts,
    gameOver,
    usedNames: Array.from(usedNames),
    guesses,
  };

  localStorage.setItem(infSaveKey(), JSON.stringify(payload));
}

function clearInfiniteState() {
  localStorage.removeItem(infSaveKey());
}

function loadInfiniteState() {
  const raw = localStorage.getItem(infSaveKey());
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

// elements
let mode = localStorage.getItem("lotmdle_quote_mode") || "daily";

const grid = document.getElementById("grid");
const list = document.getElementById("list");
const searchInput = document.getElementById("searchInput");
const statusText = document.getElementById("statusText");
const attemptsText = document.getElementById("attemptsText");
const quoteText = document.getElementById("quoteText");

const dailyBtn = document.getElementById("dailyBtn");
const infiniteBtn = document.getElementById("infiniteBtn");

const endOverlay = document.getElementById("endOverlay");
const endTitle = document.getElementById("endTitle");
const endDesc = document.getElementById("endDesc");
const playAgainBtn = document.getElementById("playAgainBtn");
const closeOverlayBtn = document.getElementById("closeOverlayBtn");

// state
const maxAttempts = 7;

let currentQuote = null;
let answerName = "";

let attempts = 0;
let gameOver = false;
let usedNames = new Set();
let currentSuggestions = [];

// pick quote
function pickQuoteDaily() {
  if (!quotesData || quotesData.length === 0) return { text: "No quotes", name: "Error" };
  return quotesData[dailyIndex(todayKey(), quotesData.length)];
}

function pickQuoteInfinite() {
  if (!quotesData || quotesData.length === 0) return { text: "No quotes", name: "Error" };
  return quotesData[Math.floor(Math.random() * quotesData.length)];
}

// dropdown
function openList() {
  if (list) list.classList.remove("hidden");
}

function closeList() {
  if (list) list.classList.add("hidden");
}

function renderList(items) {
  if (!list) return;
  list.innerHTML = "";

  items.forEach((char) => {
    const div = document.createElement("div");
    div.className = "list-item";
    div.textContent = char.name;

    const key = char.name;

    if (usedNames.has(key) || gameOver) {
      div.classList.add("used");
      div.onclick = null;
    } else {
      div.onclick = () => {
        if (usedNames.has(char.name) || gameOver) return;
        makeGuess(char.name);
        if (searchInput) searchInput.value = "";
        currentSuggestions = [];
        closeList();
      };
    }

    list.appendChild(div);
  });
}

function updateSuggestions() {
  if (!list || !searchInput) return;

  const q = searchInput.value.trim().toLowerCase();
  if (!q) {
    closeList();
    return;
  }

  currentSuggestions = characters
    .filter((c) => c.name.toLowerCase().includes(q))
    .slice(0, 30);

  renderList(currentSuggestions);
  if (currentSuggestions.length > 0) openList();
  else closeList();
}

// mode
function syncModeUI() {
  const isDaily = mode === "daily";
  if (dailyBtn) dailyBtn.classList.toggle("is-active", isDaily);
  if (infiniteBtn) infiniteBtn.classList.toggle("is-active", !isDaily);
}

function setMode(newMode) {
  if (mode === newMode) return;

  mode = newMode;
  localStorage.setItem("lotmdle_quote_mode", mode);
  syncModeUI();

  if (mode === "infinite") startInfinite({ forceNew: false });
  else resetDaily();
}

// overlay
function hideEndScreen() {
  if (endOverlay) endOverlay.classList.add("hidden");
}

function updateStreak(won) {
  const streakKey = mode === "daily" ? "lotmdle_quote_daily_streak" : "lotmdle_quote_inf_streak";
  let current = parseInt(localStorage.getItem(streakKey)) || 0;

  if (won) {
    current++;
    localStorage.setItem(streakKey, current);

    let playerName = localStorage.getItem("lotmdle_player_name");
    const finalMode = mode === "daily" ? "daily_quote" : "inf_quote";

    if (!playerName) {
      setTimeout(() => {
        playerName = prompt("Gratulacje! Podaj swój nick do rankingu:");
        if (playerName) {
          if (playerName.length > 15) playerName = playerName.substring(0, 15);
          localStorage.setItem("lotmdle_player_name", playerName);
          submitScore(playerName, current, finalMode);
        }
      }, 500);
    } else {
      submitScore(playerName, current, finalMode);
    }
  } else {
    localStorage.setItem(streakKey, 0);
  }
}

function showEndScreen(won) {
  if (endTitle) endTitle.textContent = won ? "You got it!" : "Not quite!";
  if (endDesc) endDesc.textContent = `Speaker: ${answerName}`;
  if (endOverlay) endOverlay.classList.remove("hidden");

  updateStreak(won);

  if (mode === "daily") {
    setDailyDone();
    if (playAgainBtn) {
      playAgainBtn.disabled = true;
      playAgainBtn.textContent = "Come back tomorrow";
    }
  } else {
    clearInfiniteState();
    if (playAgainBtn) {
      playAgainBtn.disabled = false;
      playAgainBtn.textContent = "Play again";
    }
  }

  const triesEl = document.getElementById("owTries");
  const maxEl = document.getElementById("owMax");
  const modeEl = document.getElementById("owMode");
  if (triesEl) triesEl.textContent = String(attempts);
  if (maxEl) maxEl.textContent = String(maxAttempts);
  if (modeEl) modeEl.textContent = mode === "daily" ? "DAILY QUOTE" : "∞ QUOTE";

  const shareEl = document.getElementById("owShare");
  if (shareEl) shareEl.innerHTML = "";
}

// daily game
function resetDaily() {
  hideEndScreen();

  currentQuote = pickQuoteDaily();
  answerName = currentQuote.name;

  attempts = 0;
  gameOver = false;
  usedNames = new Set();
  currentSuggestions = [];

  if (grid) grid.innerHTML = "";
  if (quoteText) quoteText.textContent = currentQuote.text;
  if (searchInput) searchInput.value = "";
  closeList();

  if (mode === "daily" && isDailyDone()) {
    gameOver = true;
    if (statusText) statusText.textContent = "Daily completed. Come back tomorrow.";
    if (attemptsText) attemptsText.textContent = `Attempts: 0 / ${maxAttempts}`;
    return;
  }

  if (statusText) statusText.textContent = "Read the quote and guess the character!";
  if (attemptsText) attemptsText.textContent = `Attempts: 0 / ${maxAttempts}`;
}

// infinite game
function startInfinite({ forceNew = false } = {}) {
  hideEndScreen();

  if (!forceNew) {
    const s = loadInfiniteState();
    if (s && s.quoteText && s.answerName) {
      currentQuote = { text: s.quoteText, name: s.answerName };
      answerName = s.answerName;

      attempts = typeof s.attempts === "number" ? s.attempts : 0;
      gameOver = !!s.gameOver;
      usedNames = new Set(Array.isArray(s.usedNames) ? s.usedNames : []);
      currentSuggestions = [];

      if (grid) {
        grid.innerHTML = "";
        const guesses = Array.isArray(s.guesses) ? s.guesses : [];
        guesses.forEach((g) => {
          const row = document.createElement("div");
          row.className = "row";
          row.style.gridTemplateColumns = "1fr";
          const cell = document.createElement("div");
          cell.className = g.cls || "cell wrong";
          cell.textContent = g.text || "";
          row.appendChild(cell);
          grid.appendChild(row);
        });
      }

      if (quoteText) quoteText.textContent = currentQuote.text;
      if (attemptsText) attemptsText.textContent = `Attempts: ${attempts} / ${maxAttempts}`;
      if (statusText) statusText.textContent = gameOver ? "Game finished." : "Read the quote and guess the character!";
      if (searchInput) searchInput.value = "";
      closeList();
      return;
    }
  }

  currentQuote = pickQuoteInfinite();
  answerName = currentQuote.name;

  attempts = 0;
  gameOver = false;
  usedNames = new Set();
  currentSuggestions = [];

  if (grid) grid.innerHTML = "";
  if (quoteText) quoteText.textContent = currentQuote.text;
  if (statusText) statusText.textContent = "Read the quote and guess the character!";
  if (attemptsText) attemptsText.textContent = `Attempts: 0 / ${maxAttempts}`;
  if (searchInput) searchInput.value = "";
  closeList();

  saveInfiniteState();
}

// guess
function makeGuess(name) {
  if (gameOver || attempts >= maxAttempts) return;
  if (usedNames.has(name)) return;

  usedNames.add(name);

  const row = document.createElement("div");
  row.className = "row";
  row.style.gridTemplateColumns = "1fr";

  const cell = document.createElement("div");
  cell.className = "cell";
  cell.textContent = name;

  if (name === answerName) {
    cell.classList.add("correct");
    if (statusText) statusText.textContent = `Correct! It was ${answerName}.`;
    row.appendChild(cell);
    if (grid) grid.appendChild(row);
    gameOver = true;
    if (mode === "infinite") saveInfiniteState();
    showEndScreen(true);
    return;
  }

  cell.classList.add("wrong");
  if (statusText) statusText.textContent = "Wrong speaker...";
  row.appendChild(cell);
  if (grid) grid.appendChild(row);

  attempts++;
  if (attemptsText) attemptsText.textContent = `Attempts: ${attempts} / ${maxAttempts}`;

  if (!gameOver && attempts >= maxAttempts) {
    if (statusText) statusText.textContent = `Game Over. It was ${answerName}.`;
    gameOver = true;
    if (mode === "infinite") saveInfiniteState();
    showEndScreen(false);
    return;
  }

  if (mode === "infinite") saveInfiniteState();
}

// events
if (dailyBtn) dailyBtn.onclick = () => setMode("daily");
if (infiniteBtn) infiniteBtn.onclick = () => setMode("infinite");

if (playAgainBtn) {
  playAgainBtn.onclick = () => {
    if (mode === "infinite") startInfinite({ forceNew: true });
    else resetDaily();
  };
}

if (closeOverlayBtn) closeOverlayBtn.onclick = hideEndScreen;

document.addEventListener("pointerdown", (e) => {
  if (!list || !searchInput) return;
  if (e.target !== searchInput && !list.contains(e.target)) closeList();
});

if (searchInput) {
  searchInput.addEventListener("focus", updateSuggestions);
  searchInput.addEventListener("input", updateSuggestions);
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const q = searchInput.value.trim().toLowerCase();
      const exact = characters.find((c) => c.name.toLowerCase() === q);
      const pick = exact || currentSuggestions[0];
      if (pick) {
        makeGuess(pick.name);
        searchInput.value = "";
        closeList();
      }
    }
  });
}

// Overlays
const patchBtn = document.getElementById("patchBtn");
const patchOverlay = document.getElementById("patchOverlay");
const patchCloseBtn = document.getElementById("patchCloseBtn");
if (patchBtn && patchOverlay) patchBtn.onclick = () => patchOverlay.classList.remove("hidden");
if (patchCloseBtn && patchOverlay) patchCloseBtn.onclick = () => patchOverlay.classList.add("hidden");
if (patchOverlay) patchOverlay.onclick = (e) => { if (e.target === patchOverlay) patchOverlay.classList.add("hidden"); };

const howBtn = document.getElementById("howBtn");
const howOverlay = document.getElementById("howOverlay");
const howCloseBtn = document.getElementById("howCloseBtn");
if (howBtn && howOverlay) howBtn.onclick = () => howOverlay.classList.remove("hidden");
if (howCloseBtn && howOverlay) howCloseBtn.onclick = () => howOverlay.classList.add("hidden");
if (howOverlay) howOverlay.onclick = (e) => { if (e.target === howOverlay) howOverlay.classList.add("hidden"); };

const feedbackBtn = document.getElementById("feedbackBtn");
const feedbackOverlay = document.getElementById("feedbackOverlay");
const feedbackCloseBtn = document.getElementById("feedbackCloseBtn");
if (feedbackBtn && feedbackOverlay) feedbackBtn.onclick = () => feedbackOverlay.classList.remove("hidden");
if (feedbackCloseBtn && feedbackOverlay) feedbackCloseBtn.onclick = () => feedbackOverlay.classList.add("hidden");
if (feedbackOverlay) feedbackOverlay.onclick = (e) => { if (e.target === feedbackOverlay) feedbackOverlay.classList.add("hidden"); };


// start
initTheme();
syncModeUI();
if (mode === "infinite") startInfinite({ forceNew: false });
else resetDaily();

