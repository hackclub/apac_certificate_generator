A modern document generator and verifier!

## The Saga

In the Asia Pacific region of Hack Club’s operations, there are a lot of High Schools/Institutions that require a digital document stating that they are officially recognized as a Hack Club and as a lead by Hack Club.

So, we regularly get requests from leaders that they want this certificate to be able to start their Hack Clubs.


So, this is what the flow looks like:
1. Harsh makes the certificate
2. sends it to Athul
3. Athul signs it and sends it back to Harsh
4. Harsh sends it back to the lead 
5. If a need for verification arrives, then Harsh has to do it.

<img src="https://cloud-hucstbalj-hack-club-bot.vercel.app/0image.png" alt="workflow images" />


Most of you can already see how long this chain is and it requires a lot of work to be done manually like:

1. creating the certificate
2. placing the sign { Athul has to do that } for each certificate
3. sending it back to the Harsh
4. then for Harsh to send it back the leader
5, The whole verification has to be done manually.
 
Now, we were earlier using a tool named [Hellosign](https://www.hellosign.com/), but it has certain issues:
1. You have to get a paid subscription if you go above 3 documents a month!
2. We have to manually sign, download, and send it to the Leader.
3. Verification of documents is not bulletproof, and we needed this verification to be done via our slack.
3. We couldn’t find a slack integration that could just get it all done via slack.

Clearly, this is causing issues when applied at scale { as we have a lot of Hack Clubs under the APAC region!  }.

So, we made our own service that can solve all of these issues and can do everything via our slack.

We call it **Certificate Human!**

So, here is what the flow looks like with it:
1. Harsh enters a slack command, he gets a form that he fills out.

<img src="https://cloud-64mh6luqy-hack-club-bot.vercel.app/0image.png" alt="slack command image" width="500x" />

2. Sticker Human makes a certificate from this data and sends it to Athul.

<img src="https://cloud-dc7ilwb0c-hack-club-bot.vercel.app/0image.png" alt="sign/decline image" width="500px" />
 
3. Athul accepts it and then it directly goes back to the leader.

<img src="https://cloud-f6escsqhj-hack-club-bot.vercel.app/0image.png" alt="certificate image" width="500px" />

Here is a visual representation of this process.

<img src="https://cloud-3noc54n39-hack-club-bot.vercel.app/0image.png" alt="new process image" width="500px" />

Certificate Human, here does all the heavy lifting by acting as central entity around which the whole operation relies upon!

It also keeps participants in this operation in sync, like:
1. It tells Harsh when Athul has signed/declined an Application
2. It tells Harsh and Athul, that the certificate is now shipped to the recipient (i.e the Leader).

## Verification

A big part of the work is to make sure that the documents that we issue can be verified in the future.

So, we are using basic cryptography, to verify our document.

You simply have to put your pdf file in [#certificate_check channel](https://hackclub.slack.com/archives/C029YASFA5T/p1628001365003900), and our bot will tell you whether it is a legit copy or not.

<img src="https://cloud-b8mvuqpl2-hack-club-bot.vercel.app/0image.png" alt="verification image" width="500px" />


## The Memer

It does proper Authentication to make sure that only authorized people can create certificates via it!

So, if you are not from the APAC team and try to mention Certificate Human in a channel, then it will send you a Husky joke! ( so nice of it ).

<img src="https://cloud-24kg85e96-hack-club-bot.vercel.app/0image.png" alt="husky joke image" width="200px"  />

If you face any problem or have any queries regarding this package, you can reach out to the Author: Harsh Bajpai via Hack Club’s Slack.

Slack Handle: Harsh Bajpai

<img src="https://cloud-19c4bmt00-hack-club-bot.vercel.app/0image.png" alt="harsh's image" width="250px" /> 

Thanks for reading this document, till then keep hacking and keep the hacker spirit alive!

