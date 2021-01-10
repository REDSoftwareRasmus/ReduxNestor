import { schema } from "normalizr";


// Construct Normalizr Entity with manual approach
const organisation = new schema.Entity("organisation")
const user = new schema.Entity("user", {
    organisation: organisation
})
const comment = new schema.Entity("comment", {
    user: user
})
const completion = new schema.Entity("completion", {
    user: user
})
const geoData = new schema.Entity("geoData", {
    addedBy: user,
    intClosed: completion,
    extClosed: completion,
    comments: [comment]
})
const normalizrTestEntity = new schema.Entity("project", {
    geoData: [geoData],
    organisation: organisation
})

// Construct Nestor schema
const testNestorSchema = {
    models: {
        organisation: {},
        user: {
            organisation: "organisation"
        },
        comment: {
            user: "user"
        },
        completion: {
            user: "user"
        },
        geoData: {
            addedBy: "user",
            intClosed: "completion",
            extClosed: "completion",
            comments: ["comment"]
        },
        project: {
            geoData: ["geoData"],
            organisation: "organisation"
        }
    },
    type: "project"
}

const testAPIResponse = [
    {
    "id": 1,
    "name": "IPOnly Göteborg 2020",
    "color": "rgb(255, 153, 102)",
    "description": "Göteborg fiberläggning 2020.",
    "organisation": {
        "id": 1,
        "name": "Organisation 1"
    },
    "boundaries":
        [
            [
                11.9216466,
                57.6876688
            ],
            [
                11.9261098,
                57.687795
            ],
            [
                11.9291353,
                57.6871871
            ],
            [
                11.9303155,
                57.6853059
            ],
            [
                11.9288135,
                57.6817843
            ],
            [
                11.9174409,
                57.6825185
            ],
            [
                11.9078493,
                57.6846292
            ],
            [
                11.907506,
                57.6880588
            ],
            [
                11.9149947,
                57.6901921
            ],
            [
                11.9202518,
                57.6896645
            ],
            [
                11.9215822,
                57.6876573
            ]
        ]
    ,
    "geoData": [
        {
            "id": 1001,
            "name": "Skåp broken",
            "description": "Skåpet är jävligt paj helt enkelt. Inget snacka om saken.",
            "coordinate": [
                11.9207239,
                57.692589
            ],
            "images": [],
            "archived": false,
            "timeAdded": "2020-05-28 14:13",
            "addedBy": {
                "name": "Johan Sandström",
                "id": 133,
                "isEmployee": true,
                "organisation": {
                    "id": 1,
                    "name": "Atritec"
                }
            },
            "intClosed": {
                "id": 1,
                "time": "2020-06-12 11:23",
                "user": {
                    "name": "Johan Sandström",
                    "id": 133,
                    "isEmployee": true,
                    "organisation": {
                        "id": 1,
                        "name": "Atritec"
                    }
                }
            },
            "extClosed": {
                "id": 2,
                "time": "2020-06-11 13:54",
                "user": {
                    "name": "Per Johanweik",
                    "id": 12,
                    "isEmployee": false,
                    "organisation": {
                        "id": 2,
                        "name": "Organisation 2"
                    }
                }
            },
            "comments": [
                {
                    "id": 123123123123123123,
                    "time": "2020-05-28 14:17",
                    "user": {
                        "name": "Johan Sandström",
                        "id": 133,
                        "isEmployee": true,
                        "organisation": {
                            "id": 1,
                            "name": "Atritec"
                        }
                    },
                    "content": "Skåpet behöver fixas yao. Skåpet behöver fixas yao. Skåpet behöver fixas yao. Skåpet behöver fixas yao. Skåpet behöver fixas yao.Skåpet behöver fixas yao.Skåpet behöver fixas yao.Skåpet behöver fixas yao."
                },
                {
                    "id": 1514,
                    "time": "2020-06-12 11:57",
                    "user": {
                        "name": "Alex Sand",
                        "id": 11,
                        "isEmployee": false,
                        "organisation": {
                            "id": 2,
                            "name": "Organisation 2"
                        }
                    },
                    "content": "Aight, vi lözer."
                }
            ]
        },
        {
            "id": 1002,
            "name": "Ledning i vgen",
            "description": "Ledning ligger fel, behöve flyttas",
            "coordinate": [
                11.9261742,
                57.6928413
            ],
            "images": [],
            "archived": false,
            "timeAdded": "2020-05-28 14:13",
            "addedBy": {
                "name": "Johan Sandström",
                "id": 133,
                "isEmployee": true,
                "organisation": {
                    "id": 1,
                    "name": "Atritec"
                }
            },
            "intClosed": null,
            "extClosed": null,
            "comments": []
        }
    ]
},
    {
        "id": 2,
        "name": "Skanova Partille 2020",
        "color": "rgb(255, 80, 80)",
        "description": "Göteborg inmätning 2020.",
        "organisation": {
            "id": 2,
            "name": "Organisation 2"
        },
        "boundaries":
            [
                [
                    12.0690608,
                    57.7321904
                ],
                [
                    12.0690393,
                    57.7321331
                ],
                [
                    12.0698977,
                    57.7305178
                ],
                [
                    12.0711422,
                    57.7282608
                ],
                [
                    12.0746827,
                    57.727287
                ],
                [
                    12.0758843,
                    57.7265995
                ],
                [
                    12.0766568,
                    57.7255569
                ],
                [
                    12.0791459,
                    57.7256714
                ],
                [
                    12.0802188,
                    57.7271036
                ],
                [
                    12.0811415,
                    57.72849
                ],
                [
                    12.0819569,
                    57.7301855
                ],
                [
                    12.0817637,
                    57.7318238
                ],
                [
                    12.0806265,
                    57.7333588
                ],
                [
                    12.0764422,
                    57.7330037
                ],
                [
                    12.0719147,
                    57.7325455
                ],
                [
                    12.0690608,
                    57.7321904
                ]
            ],
        "geoData": [
            {
                "id": 11,
                "name": "Skåp broken",
                "description": "Skåpet är jävligt paj helt enkelt. Inget snacka om saken.",
                "coordinate": [
                    12.0650911,
                    57.7299564
                ],
                "images": [],
                "archived": false,
                "timeAdded": "2020-05-28 14:13",
                "addedBy": {
                    "name": "Johan Sandström",
                    "id": 133,
                    "isEmployee": true,
                    "organisation": {
                        "id": 1,
                        "name": "Atritec"
                    }
                },
                "intClosed": null,
                "extClosed": {
                    "id": 8,
                    "time": "2020-06-11 13:54",
                    "user": {
                        "name": "Per Johanweik",
                        "id": 12,
                        "isEmployee": false,
                        "organisation": {
                            "id": 2,
                            "name": "Organisation 2"
                        }
                    }
                },
                "comments": [
                    {
                        "id": 242362,
                        "time": "2020-05-28 14:17",
                        "user": {
                            "name": "Johan Sandström",
                            "id": 133,
                            "isEmployee": true,
                            "organisation": {
                                "id": 1,
                                "name": "Atritec"
                            }
                        },
                        "content": "Skåpet behöver fixas yao"
                    },
                    {
                        "id": 356256256,
                        "time": "2020-06-12 11:57",
                        "user": {
                            "name": "Alex Sand",
                            "id": 10,
                            "isEmployee": false,
                            "organisation": {
                                "id": 1,
                                "name": "Atritec"
                            }
                        },
                        "content": "Aight, vi lözer."
                    }
                ]
            },
            {
                "id": 256456456,
                "name": "Ledning i vgen",
                "description": "Ledning ligger fel, behöve flyttas. Ledning ligger fel, behöve flyttas. Ledning ligger fel, behöve flyttas. Ledning ligger fel, behöve flyttas",
                "coordinate": [
                    12.0724082,
                    57.7302772
                ],
                "images": [],
                "archived": false,
                "timeAdded": "2020-05-28 14:13",
                "addedBy": {
                    "name": "Johan Sandström", 
                    "id": 133,
                    "isEmployee": true,
                    "organisation": {
                        "id": 1,
                        "name": "Atritec"
                    }
                },
                "intClosed": null,
                "extClosed": null,
                "comments": [
                    {
                        "id": 1123123123,
                        "time": "2020-06-12 11:57",
                        "user": {
                            "name": "Alex Sand", 
                            "id": 10,
                            "isEmployee": false
                        },
                        "content": "Bifoga bild för fan."
                    }
                ]
            },
            {
                "id": 80809,
                "name": "Skåp broken",
                "description": "Skåpet är jävligt paj helt enkelt. Inget snacka om saken.",
                "coordinate": [
                    12.0763993,
                    57.7285931
                ],
                "images": [],
                "archived": false,
                "timeAdded": "2020-05-28 14:13",
                "addedBy": {
                    "name": "Johan Sandström", 
                    "id": 133,
                    "isEmployee": true,
                    "organisation": {
                        "id": 1,
                        "name": "Atritec"
                    }
                },
                "intClosed": {
                    "id": 100903,
                    "time": "2020-06-12 11:23",
                    "user": {
                        "name": "Johan Sandström", 
                        "id": 133,
                        "isEmployee": true,
                        "organisation": {
                            "id": 1,
                            "name": "Atritec"
                        }
                    }
                },
                "extClosed": {
                    "id": 12304,
                    "time": "2020-06-11 13:54",
                    "user": {
                        "name": "Per Johanweik", 
                        "id": 12,
                        "isEmployee": false,
                        "organisation": {
                            "id": 3,
                            "name": "Organisation 3"
                        }
                    }
                },
                "comments": [
                    {
                        "id": 9989,
                        "time": "2020-05-28 14:17",
                        "user": {
                            "name": "Johan Sandström", 
                            "id": 133,
                            "isEmployee": true,
                            "organisation": {
                                "id": 3,
                                "name": "Organisation 3"
                            }
                        },
                        "content": "Skåpet behöver fixas yao"
                    },
                    {
                        "id": 986969,
                        "time": "2020-06-12 11:57",
                        "user": {
                            "name": "Alex Sand", 
                            "id": 10,
                            "isEmployee": false
                        },
                        "content": "Aight, vi lözer."
                    }
                ]
            },
            {
                "id": 59675679056,
                "name": "Skåp broken",
                "description": "Skåpet är jävligt paj helt enkelt. Inget snacka om saken.",
                "coordinate": [
                    12.0741677,
                    57.726336
                ],
                "images": [],
                "archived": false,
                "timeAdded": "2020-05-28 14:13",
                "addedBy": {
                    "name": "Johan Sandström", "id": 133,
                    "isEmployee": true,
                    "organisation": {
                        "id": 1,
                        "name": "Atritec"
                    }
                },
                "intClosed": {
                    "id": 658645964,
                    "time": "2020-06-12 11:23",
                    "user": {
                        "name": "Johan Sandström", "id": 133,
                        "isEmployee": true,
                        "organisation": {
                            "id": 1,
                            "name": "Atritec"
                        }
                    }
                },
                "extClosed": {
                    "id": 1266386,
                    "time": "2020-06-11 13:54",
                    "user": {
                        "name": "Per Johanweik", "id": 12,
                        "isEmployee": false
                    }
                },
                "comments": [
                    {
                        "id": 6969393,
                        "time": "2020-05-28 14:17",
                        "user": {
                            "name": "Johan Sandström", "id": 133,
                            "isEmployee": true,
                            "organisation": {
                                "id": 1,
                                "name": "Atritec"
                            }
                        },
                        "content": "Skåpet behöver fixas yao"
                    },
                    {
                        "id": 12998,
                        "time": "2020-06-12 11:57",
                        "user": {
                            "name": "Alex Sand", "id": 10,
                            "isEmployee": false
                        },
                        "content": "Aight, vi lözer."
                    }
                ]
            },
            {
                "id": 56745746,
                "name": "Skåp broken",
                "description": "Skåpet är jävligt paj helt enkelt. Inget snacka om saken.",
                "coordinate": [
                    12.0663357,
                    57.7263933
                ],
                "images": [],
                "archived": false,
                "timeAdded": "2020-05-28 14:13",
                "addedBy": {
                    "name": "Johan Sandström", "id": 133,
                    "isEmployee": true,
                    "organisation": {
                        "id": 1,
                        "name": "Atritec"
                    }
                },
                "intClosed": {
                    "id": 2387345,
                    "time": "2020-06-12 11:23",
                    "user": {
                        "name": "Johan Sandström", "id": 133,
                        "isEmployee": true,
                        "organisation": {
                            "id": 1,
                            "name": "Atritec"
                        }
                    }
                },
                "extClosed": {
                    "id": 13123123,
                    "time": "2020-06-11 13:54",
                    "user": {
                        "name": "Per Johanwek", 
                        "id": 12,
                        "isEmployee": false
                    }
                },
                "comments": [
                    {
                        "id": 6942329,
                        "time": "2020-05-28 14:17",
                        "user": {
                            "name": "Johan Sandström", "id": 133,
                            "isEmployee": true,
                            "organisation": {
                                "id": 1,
                                "name": "Atritec"
                            }
                        },
                        "content": "Skåpet behöver fixas yao"
                    },
                    {
                        "id": 3435121,
                        "time": "2020-06-12 11:57",
                        "user": {
                            "name": "Alex Sand", "id": 10,
                            "isEmployee": false
                        },
                        "content": "Aight, vi lözer."
                    }
                ]
            },
            {
                "id": 59494040,
                "name": "Skåp broken",
                "description": "Skåpet är jävligt paj helt enkelt. Inget snacka om saken.",
                "coordinate": [
                    12.0665503,
                    57.7250985
                ],
                "images": [],
                "archived": false,
                "timeAdded": "2020-05-28 14:13",
                "addedBy": {
                    "name": "Johan Sandström", "id": 133,
                    "isEmployee": true,
                    "organisation": {
                        "id": 1,
                        "name": "Atritec"
                    }

                },
                "intClosed": {
                    "id": 12312,
                    "time": "2020-06-12 11:23",
                    "user": {
                        "name": "Johan Sandström", "id": 133,
                        "isEmployee": true,
                        "organisation": {
                            "id": 1,
                            "name": "Atritec"
                        }
                    }
                },
                "extClosed": {
                    "id": 452834,
                    "time": "2020-06-11 13:54",
                    "user": {
                        "name": "Per Johanwek", 
                        "id": 12,
                        "isEmployee": false
                    }
                },
                "comments": [
                    {
                        "id": 88786654,
                        "time": "2020-05-28 14:17",
                        "user": {
                            "name": "Johan Sandström", "id": 133,
                            "isEmployee": true,
                            "organisation": {
                                "id": 1,
                                "name": "Atritec"
                            }
                        },
                        "content": "Skåpet behöver fixas yao"
                    },
                    {
                        "id": 3453453,
                        "time": "2020-06-12 11:57",
                        "user": {
                            "name": "Alex Sand", "id": 10,
                            "isEmployee": false
                        },
                        "content": "Aight, vi lözer."
                    }
                ]
            },
            {
                "id": 222,
                "name": "Skåp broken",
                "description": "Skåpet är jävligt paj helt enkelt. Inget snacka om saken.",
                "coordinate": [
                    12.0607138,
                    57.7266683
                ],
                "images": [],
                "archived": false,
                "timeAdded": "2020-05-28 14:13",
                "addedBy": {
                    "name": "Johan Sandström", "id": 133,
                    "isEmployee": true,
                    "organisation": {
                        "id": 1,
                        "name": "Atritec"
                    }
                },
                "intClosed": {
                    "id": 12391429,
                    "time": "2020-06-12 11:23",
                    "user": {
                        "name": "Johan Sandström", "id": 133,
                        "isEmployee": true,
                        "organisation": {
                            "id": 1,
                            "name": "Atritec"
                        }
                    }
                },
                "extClosed": {
                    "id": 24658,
                    "time": "2020-06-11 13:54",
                    "user": {
                        "name": "Per Johanwek", "id": 12,
                        "isEmployee": false,
                        "organisation": {
                            "id": 2,
                            "name": "Organisation 2"
                        }
                    }
                },
                "comments": [
                    {
                        "id": 2222,
                        "time": "2020-05-28 14:17",
                        "user": {
                            "name": "Johan Sandström", "id": 133,
                            "isEmployee": true,
                            "organisation": {
                                "id": 1,
                                "name": "Atritec"
                            }
                        },
                        "content": "Skåpet behöver fixas yao"
                    },
                    {
                        "id": 980583,
                        "time": "2020-06-12 11:57",
                        "user": {
                            "name": "Alex Sand", "id": 10,
                            "isEmployee": false
                        },
                        "content": "Aight, vi lözer."
                    }
                ]
            },
            {
                "id": 123123,
                "name": "Skåp broken",
                "description": "Skåpet är jävligt paj helt enkelt. Inget snacka om saken.",
                "coordinate": [
                    12.0614862,
                    57.7284098
                ],
                "images": [],
                "archived": false,
                "timeAdded": "2020-05-28 14:13",
                "addedBy": {
                    "name": "Johan Sandström", "id": 133,
                    "isEmployee": true,
                    "organisation": {
                        "id": 1,
                        "name": "Atritec"
                    }
                },
                "intClosed": {
                    "id": 1231274,
                    "time": "2020-06-12 11:23",
                    "user": {
                        "name": "Johan Sandström", "id": 133,
                        "isEmployee": true,
                        "organisation": {
                            "id": 1,
                            "name": "Atritec"
                        }
                    }
                },
                "extClosed": {
                    "id": 124640,
                    "time": "2020-06-11 13:54",
                    "user": {
                        "name": "Per Johanwek", "id": 12,
                        "isEmployee": false
                    }
                },
                "comments": [
                    {
                        "id": 11114141,
                        "time": "2020-05-28 14:17",
                        "user": {
                            "name": "Johan Sandström", "id": 133,
                            "isEmployee": true,
                            "organisation": {
                                "id": 1,
                                "name": "Atritec"
                            }
                        },
                        "content": "Skåpet behöver fixas yao"
                    },
                    {
                        "id": 34534526525,
                        "time": "2020-06-12 11:57",
                        "user": {
                            "name": "Alex Sand", "id": 10,
                            "isEmployee": false,
                            "organisation": {
                                "id": 2,
                                "name": "Organisation 2"
                            }
                        },
                        "content": "Aight, vi lözer."
                    }
                ]
            }
        ]
    }
]



export { 
    testNestorSchema,
    normalizrTestEntity,
    testAPIResponse
};