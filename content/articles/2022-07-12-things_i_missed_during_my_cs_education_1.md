---
title: Things I Missed During My CS Education (1)
description: here you can find all diagrams / code examples that have been mentioned in the "Things I Missed During My CS Education (1)" video. this video contains some basic concepts that can help to have a deep understanding in the web environment like process / thread / CPU scheduler / inter-process communication / BSD sockets API <1983> / socket communication domains / the web history / CGI / FastCGI / WSGI
---

I was having some tasks related to deploying different web-applications on linux os like python(django/flask), php(laravel), java(spring) and dotnetcore. I was blindly following some tutorials to get the things up and running. after reviewing some basic concepts I thoghut it will be good to share this video. I will try to discuss some concepts that will lead to a deeper unnderstanding of the web environment.

- Youtube Link (Arabic): <a href="https://www.youtube.com/watch?v=N41nty-jiec" target="_blank">Things I Missed During My CS Education (1) [Arabic]</a>

- Youtube Link (English): *comming soon*


Now, I'm preparing this content while listening to this calm and peaceful <a href="https://soundcloud.com/mokhbton/tyrifr9tae6z" target="_blank">voice</a> ... happy reading 😌

---

1. [Diagrams](#sec-0).
2. [Code Examples](#sec-1).

## <a id="sec-0"></a> Diagrams:

#### Agenda
![agenda](/articles-data/2022-07-12-things_i_missed_during_my_cs_education_1/agenda.webp)

#### Processes / Threads / CPU scheduler
![cpu-scheduler](/articles-data/2022-07-12-things_i_missed_during_my_cs_education_1/cpu-scheduler.webp)

#### Terminal Device
![terminal-device](/articles-data/2022-07-12-things_i_missed_during_my_cs_education_1/terminal-device.webp)

#### Terminal Emulator
![terminal-emulator](/articles-data/2022-07-12-things_i_missed_during_my_cs_education_1/terminal-emulator.webp)

#### Standard Streams [stdin, stdout, stderr] / Stream Redirection
![standard-redirection](/articles-data/2022-07-12-things_i_missed_during_my_cs_education_1/text-redirection.webp)

#### Pipes
![unnamed-pipes](/articles-data/2022-07-12-things_i_missed_during_my_cs_education_1/unnamed-pipes.webp)

#### Socket Communication Domains
![socket-communication-domains](/articles-data/2022-07-12-things_i_missed_during_my_cs_education_1/socket-communication-domains.webp)

#### Sockets API
![socket-domains](/articles-data/2022-07-12-things_i_missed_during_my_cs_education_1/socket-domains.webp)

#### Static Pages
![static-pages](/articles-data/2022-07-12-things_i_missed_during_my_cs_education_1/static-pages.webp)

#### Common Gateway Interface
![dynamic-pages](/articles-data/2022-07-12-things_i_missed_during_my_cs_education_1/dynamic-pages.webp)

#### Nginx / WSGI Server / WSGI Application / Python
![wsgi](/articles-data/2022-07-12-things_i_missed_during_my_cs_education_1/wsgi.webp)

#### Nginx / PHP-FPM / PHP
![php](/articles-data/2022-07-12-things_i_missed_during_my_cs_education_1/php.webp)


## <a id="sec-1"></a> Code Examples:

#### Files

```bash [🤖 Discovering the files in unix]
sudo evtest
# Available devices:
# /dev/input/event0:	Lid Switch
# /dev/input/event1:	Power Button
# /dev/input/event2:	Sleep Button
# /dev/input/event3:	Power Button
# /dev/input/event4:	AT Translated Set 2 keyboard
# /dev/input/event5:	AlpsPS/2 ALPS DualPoint Stick
# /dev/input/event6:	AlpsPS/2 ALPS DualPoint TouchPad
# /dev/input/event7:	ST LIS3LV02DL Accelerometer
# /dev/input/event8:	Dell WMI hotkeys
# /dev/input/event9:	Laptop_Integrated_Webcam_HD: In
# /dev/input/event10:	HDA Intel PCH Dock Mic
# /dev/input/event11:	HDA Intel PCH Dock Line Out
# /dev/input/event12:	HDA Intel PCH Front Headphone
# /dev/input/event13:	Video Bus
# /dev/input/event14:	Video Bus
# /dev/input/event15:	HDA Intel HDMI HDMI/DP,pcm=3
# /dev/input/event16:	HDA Intel HDMI HDMI/DP,pcm=7
# /dev/input/event17:	HDA Intel HDMI HDMI/DP,pcm=8
# /dev/input/event18:	HDA Intel HDMI HDMI/DP,pcm=9
# /dev/input/event19:	HDA Intel HDMI HDMI/DP,pcm=10

sudo cat /dev/input/event6    # TouchPad character device file
# K��bb�9	K��bb�5��hK���#K���K���5K���6cK���K
# ���cK���$K���K��b�5	K��b�6hK��b�	
# K��b�hK��b�%K��b�K��b$�5K��b$�K��b$�&# K��b$�K��b�#'K�
# 5K��b��6mK��b��Z�^C

ls -al /dev/input
# total 0
# drwxr-xr-x 2 root root      60 Jul 12 19:08 by-id
# drwxr-xr-x 2 root root     160 Jul 12 19:08 by-path
# crw-rw---- 1 root input 13, 64 Jul 12 19:08 event0
# crw-rw---- 1 root input 13, 65 Jul 12 19:08 event1
# crw-rw---- 1 root input 13, 66 Jul 12 19:08 event2
# crw-rw---- 1 root input 13, 67 Jul 12 19:08 event3
# crw-rw---- 1 root input 13, 68 Jul 12 19:08 event4
# crw-rw---- 1 root input 13, 69 Jul 12 19:08 event5
# crw-rw---- 1 root input 13, 70 Jul 12 19:08 event6
# crw-rw-r-- 1 root input 13,  0 Jul 12 19:08 js0
# crw-rw---- 1 root input 13, 63 Jul 12 19:08 mice
# crw-rw---- 1 root input 13, 32 Jul 12 19:08 mouse0
# crw-rw---- 1 root input 13, 33 Jul 12 19:08 mouse1
```

#### Standard Streams
```python [🤖 counter.py]
import time

for index in range(1000):
  print(index, flush=True)
  time.sleep(1)
```

```bash [🤖 Discovering Standard Streams]
python counter.py
# 0
# 1
# 2
# 3
# ..

ls -al /proc/648820/fd
# total 0
# lrwx------ 1 me me 64 Jul 12 22:00 0 -> /dev/pts/5
# lrwx------ 1 me me 64 Jul 12 22:00 1 -> /dev/pts/5
# lrwx------ 1 me me 64 Jul 12 22:00 2 -> /dev/pts/5

# redirect:
#     - stdout (file-discriptor=1) to log file
#     - stderr (file-discriptor=2) to log-err file
python counter.py 1> log 2> err-log

tail -f log
# 0
# 1
# 2
# 3
# ..

tail -f err-log
# Traceback (most recent call last):
#   File "/media/hard/abdelaziz/dev/projects/me/meta/socket/standard-streams/counter.py", line 5, in <module>
#     time.sleep(1)
# KeyboardInterrupt
```


#### Pipes
unnamed pipes

```python [🤖 sqrt.py]
from math import sqrt
import os

print('========== PID: {pid} =========='.format(pid=os.getpid()))

# print sqrt each loop
while True:
  number = input("> ")
  if number == '':
    break
  print(sqrt(float(number)), flush=True)
```

```bash [🤖 Unnamed Pipes]
python counter.py | python sqrt.py
========== PID: 678604 ==========
> 0.0
> 1.0
> 1.4142135623730951
```

named pipes

```bash [🤖 writer.py]
import os
import io

print('========== PID: {pid} =========='.format(pid=os.getpid()))

# open the write end of the pipe
pipe_file_name = 'pipe'

if os.path.exists(pipe_file_name):
  os.remove(pipe_file_name)
os.mkfifo(pipe_file_name)

pipe = io.open(pipe_file_name, 'w')

# start sending the messages
while True:
  message = input("> ")
  if len(message) == 0:
    break

  pipe.write(message + '\n')
  pipe.flush()

```

```bash [🤖 reader.py]
import os
import io

print('========== PID: {pid} =========='.format(pid=os.getpid()))

# open the read end of the pipe
pipe_file_name = 'pipe'

pipe = io.open(pipe_file_name, 'r')

# start receiving the messages
while True:
  message = pipe.readline()[:-1]
  if len(message) == 0:
    break

  print(f'received: {message}')
```

#### Signals
```python [🤖 added code]
import signal
import sys

def terminate_handler(*args):
  print('salam')
  sys.exit(0)

signal.signal(signal.SIGINT, terminate_handler)
```


#### Sockets

unix communication domain

```python [🤖 server.py]
import os
import socket

class Server:
  """ delivering [🍗, 🍟, ☕] """
  def __init__(self, client_socket_address, server_socket_address):
    self.client_socket_address = client_socket_address
    self.server_socket_address = server_socket_address

    # remove the previous socket path
    if os.path.exists(self.server_socket_address):
      os.remove(self.server_socket_address)

    self.server_socket = socket.socket(
        family=socket.AF_UNIX,
        type=socket.SOCK_DGRAM
    )
    self.server_socket.bind(self.server_socket_address)

  def listen(self):
    while True:
      message = self.server_socket.recv(1024).decode()

      if len(message) == 0:
        self.server_socket.close()
        break

      print(f'making "{message}"')

      self.send_response(message)

  def send_response(self, message):
    self.server_socket.connect(self.client_socket_address)
    print(f'start delivering "{message}"')
    self.server_socket.send(f'delivering "{message}"'.encode())

Server(
  server_socket_address='./server.sock',
  client_socket_address='./client.sock',
).listen()
```

```python [🤖 client.py]
import os
import socket

class Client:
  """ order [🍗, 🍟, ☕] """
  def __init__(self, client_socket_address, server_socket_address):
    self.client_socket_address = client_socket_address
    self.server_socket_address = server_socket_address

    # remove the previous socket path
    if os.path.exists(self.client_socket_address):
      os.remove(self.client_socket_address)

    self.client_socket = socket.socket(
        family=socket.AF_UNIX,
        type=socket.SOCK_DGRAM
    )
    self.client_socket.bind(self.client_socket_address)

  def send_request(self):
    self.client_socket.connect(self.server_socket_address)

    while True:
      message = input("> ")
      self.client_socket.send(message.encode())

      if len(message) == 0:
        self.client_socket.close()
        break

      self.wait_response()

  def wait_response(self):
    message = self.client_socket.recv(1024).decode()
    print(f'received that server is {message}')

Client(
  server_socket_address='./server.sock',
  client_socket_address='./client.sock',
).send_request()
```

internet communication domain

```python [🤖 changed code]

# using AF_INET address family
self.client_socket = socket.socket(
    family=socket.AF_INET,
    type=socket.SOCK_DGRAM
)

# address format
Client(
  server_socket_address=('127.0.0.1', 9000),
  client_socket_address=('127.0.0.1', 11000)
)
```