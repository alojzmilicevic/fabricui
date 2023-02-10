import { JSONValue } from "../jsonTokenizer";
export const commaFixTestJson: JSONValue = {
    a: "hejsan, då",
    b: "var, katten",
};
export const complexTestJson: JSONValue = {
    a: "hej",
    r: 26,
    x: {
        en_EN: [
            "hej, då",
            "katt,",
            {
                a: {
                    eN_en:
                        "hej detta är en lång mening som kommer förstöra saker om den bara är nog lång så he he he he",
                    nuf: "nuf",
                },
            },
        ],
        apa: {
            hej_san: "detta{{}} då",
            nb_NO: "detta då []",
        },
        nb_NO: "Hei {{recipientName}}eg å {{action}}  med {{signingMethod}}.",
        sv_SE: " Handelsnt, som du ska {{action}} med ditt {{signingMethod}}.",
    },
    arrs: [
        1,
        "hej detta är en lång mening som kommer förstöra saker om den bara är nog lång så he " +
            "he he he hej detta är en lång mening som kommer förstöra saker om den bara är nog" +
            " lång så he he he he hej detta är en lång mening som kommer förstöra saker om den bara är nog lång så he he he he",
        {
            a: 1,
            b: true,
        },
        false,
    ],
    "web-app": {
        servlet: [
            {
                "servlet-name": "cofaxCDS",
                "servlet-class": "org.cofax.cds.CDSServlet",
                "init-param": {
                    installationAt: "Philadelphia, PA",
                    adminEmail: "ksm@pobox.com",
                    poweredBy: "Cofax",
                    poweredByIcon: "/images/cofax.gif",
                    staticPath: "/content/static",
                    templateProcessorClass: "org.cofax.WysiwygTemplate",
                    templateLoaderClass: "org.cofax.FilesTemplateLoader",
                    templatePath: "templates",
                    templateOverridePath: "",
                    defaultListTemplate: "listTemplate.htm",
                    defaultFileTemplate: "articleTemplate.htm",
                    useJSP: false,
                    jspListTemplate: "listTemplate.jsp",
                    jspFileTemplate: "articleTemplate.jsp",
                    cachePackageTagsTrack: 200,
                    cachePackageTagsStore: 200,
                    cachePackageTagsRefresh: 60,
                    cacheTemplatesTrack: 100,
                    cacheTemplatesStore: 50,
                    cacheTemplatesRefresh: 15,
                    cachePagesTrack: 200,
                    cachePagesStore: 100,
                    cachePagesRefresh: 10,
                    cachePagesDirtyRead: 10,
                    searchEngineListTemplate: "forSearchEnginesList.htm",
                    searchEngineFileTemplate: "forSearchEngines.htm",
                    searchEngineRobotsDb: "WEB-INF/robots.db",
                    useDataStore: true,
                    dataStoreClass: "org.cofax.SqlDataStore",
                    redirectionClass: "org.cofax.SqlRedirection",
                    dataStoreName: "cofax",
                    dataStoreDriver: "com.microsoft.jdbc.sqlserver.SQLServerDriver",
                    dataStoreUser: "sa",
                    dataStorePassword: "dataStoreTestQuery",
                    dataStoreTestQuery: "SET NOCOUNT ON;select test='test';",
                    dataStoreInitConns: 10,
                    dataStoreMaxConns: 100,
                    dataStoreConnUsageLimit: 100,
                    dataStoreLogLevel: "debug",
                    maxUrlLength: 500,
                },
            },
            {
                "servlet-name": "cofaxEmail",
                "servlet-class": "org.cofax.cds.EmailServlet",
                "init-param": {
                    mailHost: "mail1",
                    mailHostOverride: "mail2",
                },
            },
            {
                "servlet-name": "cofaxAdmin",
                "servlet-class": "org.cofax.cds.AdminServlet",
            },

            {
                "servlet-name": "fileServlet",
                "servlet-class": "org.cofax.cds.FileServlet",
            },
            {
                "servlet-name": "cofaxTools",
                "servlet-class": "org.cofax.cms.CofaxToolsServlet",
                "init-param": {
                    templatePath: "toolstemplates/",
                    log: 1,
                    logLocation: "/usr/local/tomcat/logs/CofaxTools.log",
                    logMaxSize: "",
                    dataLog: 1,
                    dataLogLocation: "/usr/local/tomcat/logs/dataLog.log",
                    dataLogMaxSize: "",
                    removePageCache: "/content/admin/remove?cache=pages&id=",
                    removeTemplateCache: "/content/admin/remove?cache=templates&id=",
                    lookInContext: 1,
                    adminGroupID: 4,
                    betaServer: true,
                },
            },
        ],
        "servlet-mapping": {
            cofaxCDS: "/",
            cofaxEmail: "/cofaxutil/aemail/*",
            cofaxAdmin: "/admin/*",
            fileServlet: "/static/*",
            cofaxTools: "/tools/*",
        },

        taglib: {
            "taglib-uri": "cofax.tld",
            "taglib-location": "/WEB-INF/tlds/cofax.tld",
        },
    },
};
