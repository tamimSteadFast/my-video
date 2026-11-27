// Narration text copied verbatim from public/ssh/scenes_manifest.json. Seconds measured from the WAV files.
export const SSH_RAW = [
  {
    "n": 1,
    "file": "scene_01_suspenseful_and_dramatic_scene_1.wav",
    "text": "সারাদিনের কাজ শেষ করে ঘুমাতে যাবে একজন Developer। ঠিক তখনই ফোনে একটা Notification! তার Website আর কাজ করছে না। অথচ Website-এর Server রয়েছে হাজার মাইল দূরে। এখন? এই রাতেই কি তাকে Server-এর কাছে ছুটে যেতে হবে?",
    "sec": 20.14
  },
  {
    "n": 2,
    "file": "scene_02_tense_and_curious_scene_2.wav",
    "text": "না! তাকে কোথাও যেতে হবে না। নিজের Laptop সামনে রেখেই সে দূরের সেই Server-এ প্রবেশ করতে পারবে। Server-এর সামনে না দাঁড়িয়েও, নিজের ঘরে বসেই পুরো Server Control করা সম্ভব। কিন্তু কীভাবে?",
    "sec": 14.33
  },
  {
    "n": 3,
    "file": "scene_03_mysterious_reveal_scene_3.wav",
    "text": "এই অদৃশ্য Connection-এর নাম SSH। যার পূর্ণরূপ Secure Shell। এটি এমন একটি Network Protocol, যার সাহায্যে Internet-এর মাধ্যমে নিরাপদে Remote Computer বা Server-এর সঙ্গে Connect হওয়া যায়।",
    "sec": 15.28
  },
  {
    "n": 4,
    "file": "scene_04_explanatory_and_engaging_scene_4.wav",
    "text": "চলো, এর পেছনের গল্পটা বুঝি। তোমার Laptop হলো SSH Client। আর দূরের Computer-টি হলো SSH Server। তুমি যখন Connection Request পাঠাও, Server প্রথমে তোমার পরিচয় যাচাই করে। Authentication সফল হলেই তৈরি হয় একটি Secure Connection।",
    "sec": 18.23
  },
  {
    "n": 5,
    "file": "scene_05_intriguing_and_technical_scene_5.wav",
    "text": "কিন্তু Internet-এর মতো উন্মুক্ত Network দিয়ে Data পাঠালে অন্য কেউ যদি সেটি ধরে ফেলে? এখানেই SSH-এর আসল শক্তি। এটি Data Encrypted করে আদান-প্রদান করে। ফলে মাঝপথে কেউ Data Intercept করলেও সহজে তার অর্থ বুঝতে পারে না। আর SSH-এর Default Port হলো 22।",
    "sec": 20.08
  },
  {
    "n": 6,
    "file": "scene_06_educational_and_clear_scene_6.wav",
    "text": "তবে Server কীভাবে বুঝবে, তুমি সত্যিই সেই Developer? এর জন্য রয়েছে Authentication। তুমি Password দিয়ে Login করতে পারো। আবার SSH Key ব্যবহার করতে পারো। এখানে Public Key Server-এ থাকে, আর Private Key তোমার কাছে নিরাপদে থাকে। Private Key দিয়ে তৈরি Signature যাচাই করেই Server তোমার পরিচয় নিশ্চিত করে।",
    "sec": 23.5
  },
  {
    "n": 7,
    "file": "scene_07_practical_and_exciting_scene_7.wav",
    "text": "এবার নিজের Laptop-এ ফিরে আসি। Terminal Open করো। এবার লিখো, ssh user at 192 dot 168 dot 1 dot 100। Enter চাপো। Authentication সফল হলে তুমি চলে যাবে Remote Server-এর Terminal-এ। এবার whoami, pwd কিংবা ls-এর মতো Command চালিয়ে Server-এর তথ্য দেখতে এবং কাজ করতে পারবে।",
    "sec": 26.92
  },
  {
    "n": 8,
    "file": "scene_08_energetic_and_inspiring_scene_8.wav",
    "text": "এভাবেই একজন Developer Linux Server Manage করতে পারে, Node.js Application Deploy করতে পারে, Git Repository Access করতে পারে এবং Remote Server-এর বিভিন্ন কাজ সম্পন্ন করতে পারে। প্রতিদিনের Backend Development এবং DevOps-এর কাজে SSH একটি অত্যন্ত গুরুত্বপূর্ণ Tool।",
    "sec": 19.11
  },
  {
    "n": 9,
    "file": "scene_09_serious_and_responsible_scene_9.wav",
    "text": "তবে মনে রেখো, ক্ষমতার সঙ্গে দায়িত্বও আসে। নিজের Private Key কখনো অন্যের সঙ্গে Share করবে না। Strong Authentication ব্যবহার করবে এবং Server-এর Access Permission সঠিকভাবে Configure করবে।",
    "sec": 15.02
  },
  {
    "n": 10,
    "file": "scene_10_powerful_and_inspirational_scene_10.wav",
    "text": "ফোনের সেই Notification-এর কথা মনে আছে? এবার Developer তার ঘরে বসেই Server-এ প্রবেশ করল, সমস্যা খুঁজে বের করল এবং Website আবার সচল করল। এটাই SSH-এর শক্তি। দূরত্ব এখানে কোনো বাধা নয়। তুমি যদি একজন Developer হতে চাও, SSH শেখা শুরু করো আজ থেকেই।",
    "sec": 19.92
  }
] as const;
