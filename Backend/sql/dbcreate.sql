/* Create Database Tables */
/*    Design Based on RE Database */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/*    Last Edited: Cooper Brindle 24/05/2018 12:14pm*/


/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* Cooper 06/09/18 */
CREATE TABLE CONSTITUENT(
    id          VARCHAR(10)     NOT NULL, /* Constituent ID Number */
    stdNum      VARCHAR(10)     NOT NULL, /* Student Number */
    birthDate   VARCHAR(10)     NULL, /* Date of Birth */
    title       VARCHAR(256)     NULL, /* Title ie Mr Miss */
    firstName   VARCHAR(256)     NULL, /* First Name */
    nickname    VARCHAR(256)     NULL, /* Nickname */
    middleName  VARCHAR(256)     NULL, /* Middle Name */
    lastName    VARCHAR(256)     NOT NULL, /* Last Name/s */
    maidenName  VARCHAR(256)     NULL, /* Maiden Name */
    orgName     VARCHAR(256)    NULL, /* Employer Organisation Name */
    position    VARCHAR(256)    NULL, /* Position Name */
    address     VARCHAR(256)    NULL, /* Home Address */
    city        VARCHAR(256)    NULL, /* Home city */
    state       VARCHAR(256)    NULL, /* Home State */
    county      VARCHAR(256)    NULL, /* Home County */
    postcode    VARCHAR(256)    NULL, /* Home Postcode */
    country     VARCHAR(256)    NULL, /* Home Country */
    email       VARCHAR(256)    NULL, /* Preferred Email */
    emailOther  VARCHAR(256)    NULL, /* Other Email */
    linkedIn    VARCHAR(256)    NULL, /* LinkedIn URL */
    mobile      VARCHAR(256)    NULL, /* Mobile Number */
    postSub     VARCHAR(10)     NOT NULL, /* Option to Recieve Postal Communications */
    mobileSub   VARCHAR(10)     NOT NULL, /* Option to Recieve Mobile Communications */
    emailSub    VARCHAR(10)     NOT NULL, /* Option to Recieve Email Communications */
    promotions  VARCHAR(10)     NOT NULL, /* Option to Recieve Promotional Communications */
    outlook     VARCHAR(10)     NOT NULL, /* Outlook Magazine Subscription */

    CONSTRAINT CONSTITUENT_pkey PRIMARY KEY (id),
    CONSTRAINT CONSTITUENT_uni UNIQUE (stdNum),
    CONSTRAINT CONSTITUENT_uni2 UNIQUE (firstName, lastName, email));


CREATE TABLE CONSTITUENTEXPORT(
    id          VARCHAR(10)     NOT NULL, /* Constituent ID Number */
    stdNum      VARCHAR(256)     NOT NULL, /* Student Number */
    birthDate   VARCHAR(256)     NULL, /* Date of Birth */
    title       VARCHAR(256)     NULL, /* Title ie Mr Miss */
    firstName   VARCHAR(256)     NULL, /* First Name */
    nickname    VARCHAR(256)     NULL, /* Nickname */
    middleName  VARCHAR(256)     NULL, /* Middle Name */
    lastName    VARCHAR(256)     NOT NULL, /* Last Name/s */
    maidenName  VARCHAR(256)     NULL, /* Maiden Name */
    orgName     VARCHAR(256)    NULL, /* Employer Organisation Name */
    position    VARCHAR(256)    NULL, /* Position Name */
    address     VARCHAR(256)    NULL, /* Home Address */
    city      VARCHAR(256)    NULL, /* Home city */
    state       VARCHAR(256)    NULL, /* Home State */
    county      VARCHAR(256)    NULL, /* Home County */
    postcode    VARCHAR(256)    NULL, /* Home Postcode */
    country     VARCHAR(256)    NULL, /* Home Country */
    email       VARCHAR(256)    NULL, /* Preferred Email */
    emailOther  VARCHAR(256)    NULL, /* Other Email */
    linkedIn    VARCHAR(256)    NULL, /* LinkedIn URL */
    mobile      VARCHAR(256)    NULL, /* Mobile Number */
    postSub     VARCHAR(10)     NOT NULL, /* Option to Recieve Postal Communications */
    mobileSub   VARCHAR(10)     NOT NULL, /* Option to Recieve Mobile Communications */
    emailSub    VARCHAR(10)     NOT NULL, /* Option to Recieve Email Communications */
    promotions  VARCHAR(10)     NOT NULL, /* Option to Recieve Promotional Communications */
    outlook     VARCHAR(10)     NOT NULL, /* Outlook Magazine Subscription */

    CONSTRAINT CONSTITUENTEXPORT_pkey PRIMARY KEY (id),
    CONSTRAINT CONSTITUENTEXPORT_uni UNIQUE (stdNum),
    CONSTRAINT CONSTITUENTEXPORT_uni2 UNIQUE (firstName, lastName, email));

/* Cooper 06/09/2018 */
CREATE TABLE LIBRARYMEM(
    id          VARCHAR(10)     NOT NULL, /* Constituent ID Number */
    stdNum      VARCHAR(10)     NOT NULL, /* Student Number */
    username    VARCHAR(256)    NOT NULL, /* Membership Username */
    password    VARCHAR(256)    NOT NULL, /* Membership Password */
    expiry      DATE            NULL, /* Date of Membership Expiry */
    
    CONSTRAINT LIBRARYMEM_pkey PRIMARY KEY (id),
    CONSTRAINT LIBRARYMEM_fkey1 FOREIGN KEY (id)
        REFERENCES CONSTITUENT (id),
    CONSTRAINT LIBRARYMEM_fkey2 FOREIGN KEY (stdNum)
        REFERENCES CONSTITUENT (stdNum) );

CREATE TABLE LIBRARYMEMEXPORT(
    id          VARCHAR(10)     NOT NULL, /* Constituent ID Number */
    stdNum      VARCHAR(10)     NOT NULL, /* Student Number */
    email       VARCHAR(256)    NOT NULL, /* Email Address */

    CONSTRAINT LIBRARYMEMEXPORT_pkey PRIMARY KEY (id),
    CONSTRAINT LIBRARYMEMEXPORT_fkey1 FOREIGN KEY (id)
        REFERENCES CONSTITUENT (id),
    CONSTRAINT LIBRARYMEMEXPORT_fkey2 FOREIGN KEY (stdNum)
        REFERENCES CONSTITUENT (stdNum) );

/* Cooper 06/09/2018 */
CREATE TABLE EVENTS(
    eventname       VARCHAR(256)    NOT NULL, /* Event Name */
    eventgroup      VARCHAR(256)     NOT NULL, /* Organising Department */
    eventtype       VARCHAR(256)     NOT NULL, /* Purpose of Event */
    startdate       VARCHAR(256)     NOT NULL, /* Start of Event */
    enddate         VARCHAR(256)     NOT NULL, /* End of Event */
    starttime       VARCHAR(256)     NOT NULL, /* Start Time */
    endtime         VARCHAR(256)     NOT NULL, /* End Time */
    capacity        DECIMAL(4)      NOT NULL, /* Max number of attendants */
    locationname    VARCHAR(256)    NULL, /* Event Venue */
    address         VARCHAR(256)    NULL, /* Venue Address */
    city            VARCHAR(256)    NULL, /* Venue City */
    state           VARCHAR(256)    NULL, /* Venue State */
    postcode        VARCHAR(256)    NULL, /* Venue Postcode */
    country         VARCHAR(256)    NULL, /* Event Country */
    regLink         VARCHAR(256)    NULL, /* Paid Event Rego Link */
    cost            VARCHAR(256)    NULL, /* To be displayed */
    blurb           VARCHAR(256)    NULL, /* Descriptive Blurb */
    latitude        DOUBLE(15,10)   NULL, 
    longitude       DOUBLE(15,10)   NULL,
    CONSTRAINT EVENTS_pkey PRIMARY KEY (eventname));

/* Cooper 31/08/2018 */
CREATE TABLE DISCOUNTS(
    titleID         VARCHAR(100)     NOT NULL, /* Short Hand Unique Name for Discounts */
    partnerType     VARCHAR(100)     NOT NULL, /* UOW, Local, National, Global */
    displayName     VARCHAR(256)    NOT NULL, /* Full display name for Discount */
    discountType    VARCHAR(4)      NOT NULL, /* card = display card, code = checkout code, link */
    blurb           VARCHAR(1028)   NOT NULL, /* To be displayed on discount page */
    imageURL        VARCHAR(256)    NULL,    /* URL for Logo to be Displayed */
    link            VARCHAR(256)    NULL,        /* Link to discount */
    CONSTRAINT DISCOUNTS_pkey PRIMARY KEY (titleID) );

/* Cooper 24/05/18 */
CREATE TABLE APPUSER(
    id          VARCHAR(10)     NOT NULL, /* Universal Unique Identifier */
    username    VARCHAR(256)    NOT NULL, /* Unique user name */
    passHash    VARCHAR(256)    NOT NULL, /* Hash value of password */

    CONSTRAINT USER_pkey PRIMARY KEY (id, username),
    CONSTRAINT APPUSER_uni UNIQUE (username),
    CONSTRAINT USER_fkey1 FOREIGN KEY (id)
        REFERENCES CONSTITUENT (id) );

CREATE TABLE EVENTCONSTITUENTEXPORT(
    eventname   VARCHAR(256)    NOT NULL, /* Event Name */   
    id          VARCHAR(10)     NOT NULL, /* Constituent ID Number */
    stdNum      VARCHAR(10)     NOT NULL, /* Student Number */
    title       VARCHAR(10)     NULL, /* Title ie Mr Miss */
    firstName   VARCHAR(36)     NULL, /* First Name */
    lastName    VARCHAR(64)     NOT NULL, /* Last Name/s */
    orgName     VARCHAR(256)    NULL, /* Employer Organisation Name */
    position    VARCHAR(256)    NULL, /* Position Name */
    dietary     VARCHAR(256)    NULL,  /* Dietary Requirements */
    mobility    VARCHAR(256)    NULL, /* Mobility Needs */
    CONSTRAINT EVENTCONSTITUENTEXPORT_pkey PRIMARY KEY (id, eventname),
    CONSTRAINT EVENTCONSTITUENTEXPORT_fkey1 FOREIGN KEY (id)
        REFERENCES CONSTITUENT (id),
    CONSTRAINT EVENTCONSTITUENTEXPORT_fkey2 FOREIGN KEY (stdNum)
        REFERENCES CONSTITUENT (stdNum),
    CONSTRAINT EVENTCONSTITUENTEXPORT_fkey3 FOREIGN KEY (eventname)
        REFERENCES EVENTS (eventname));

CREATE TABLE EVENTGUESTEXPORT(
    eventname   VARCHAR(256)    NOT NULL, /* Event Name */   
    id          VARCHAR(10)     NOT NULL, /* Constituent ID Number */
    title       VARCHAR(10)     NULL, /* Title ie Mr Miss */
    firstName   VARCHAR(36)     NULL, /* First Name */
    lastName    VARCHAR(64)     NOT NULL, /* Last Name/s */
    orgName     VARCHAR(256)    NULL, /* Employer Organisation Name */
    position    VARCHAR(256)    NULL, /* Position Name */
    dietary     VARCHAR(256)    NULL,  /* Dietary Requirements */
    mobility    VARCHAR(256)    NULL, /* Mobility Needs */
    CONSTRAINT EVENTGUESTEXPORT_pkey PRIMARY KEY (id, eventname),
    CONSTRAINT EVENTGUESTEXPORT_fkey1 FOREIGN KEY (id)
        REFERENCES CONSTITUENT (id),
    CONSTRAINT EVENTGUESTEXPORT_fkey2 FOREIGN KEY (eventname)
        REFERENCES EVENTS (eventname));

CREATE TABLE EVENTCONSTITUENT(
    eventname   VARCHAR(256)    NOT NULL, /* Event Name */   
    id          VARCHAR(10)     NOT NULL, /* Constituent ID Number */
    stdNum      VARCHAR(10)     NOT NULL, /* Student Number */
    title       VARCHAR(10)     NULL, /* Title ie Mr Miss */
    firstName   VARCHAR(36)     NULL, /* First Name */
    lastName    VARCHAR(64)     NOT NULL, /* Last Name/s */
    orgName     VARCHAR(256)    NULL, /* Employer Organisation Name */
    position    VARCHAR(256)    NULL, /* Position Name */
    dietary     VARCHAR(256)    NULL,  /* Dietary Requirements */
    mobility    VARCHAR(256)    NULL, /* Mobility Needs */
    CONSTRAINT EVENTCONSTITUENT_pkey PRIMARY KEY (id, eventname),
    CONSTRAINT EVENTCONSTITUENT_fkey1 FOREIGN KEY (id)
        REFERENCES CONSTITUENT (id),
    CONSTRAINT EVENTCONSTITUENT_fkey2 FOREIGN KEY (stdNum)
        REFERENCES CONSTITUENT (stdNum),
    CONSTRAINT EVENTCONSTITUENT_fkey3 FOREIGN KEY (eventname)
        REFERENCES EVENTS (eventname));

CREATE TABLE EVENTGUEST(
    eventname   VARCHAR(256)    NOT NULL, /* Event Name */   
    id          VARCHAR(10)     NOT NULL, /* Constituent ID Number */
    title       VARCHAR(10)     NULL, /* Title ie Mr Miss */
    firstName   VARCHAR(36)     NULL, /* First Name */
    lastName    VARCHAR(64)     NOT NULL, /* Last Name/s */
    orgName     VARCHAR(256)    NULL, /* Employer Organisation Name */
    position    VARCHAR(256)    NULL, /* Position Name */
    dietary     VARCHAR(256)    NULL,  /* Dietary Requirements */
    mobility    VARCHAR(256)    NULL, /* Mobility Needs */
    CONSTRAINT EVENTGUEST_pkey PRIMARY KEY (id, eventname),
    CONSTRAINT EVENTGUEST_fkey1 FOREIGN KEY (id)
        REFERENCES CONSTITUENT (id),
    CONSTRAINT EVENTGUEST_fkey2 FOREIGN KEY (eventname)
        REFERENCES EVENTS (eventname));

CREATE TABLE MAGAZINEHIGHLIGHTS(
    title       VARCHAR(128)    NOT NULL, /* Name of the magazine article */
    description  VARCHAR(256)    NOT NULL, /* Description of article */
    link        VARCHAR(256)    NOT NULL, /* Link to Website */
    CONSTRAINT MAGAZINEHIGHLIGHTS_pkey PRIMARY KEY (title));