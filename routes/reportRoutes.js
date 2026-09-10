import express from 'express';

import Goat from '../models/Goat.js';
import Weight from '../models/Weight.js';
import MilkRecord from '../models/MilkRecord.js';
import MedicalRecord from '../models/MedicalRecord.js';
import Sale from '../models/Sale.js';
import Event from '../models/Event.js';
import { requireFarmAccess } from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(requireFarmAccess);


/* =========================================================
   GET COMPLETE REPORT
   GET /api/reports
========================================================= */

router.get('/', async (req, res) => {
  try {

    const {
      tenantId,
      startDate,
      endDate,
      goatId,
    } = req.query;


    /* -------------------------------------------------------
       BASE QUERY
    ------------------------------------------------------- */

    const goatQuery = {};

    const weightQuery = {};

    const milkQuery = {};

    const medicalQuery = {};

    const saleQuery = {};

    const eventQuery = {};


    /* -------------------------------------------------------
       TENANT FILTER
    ------------------------------------------------------- */

    if (tenantId) {

      goatQuery.tenantId = tenantId;

      weightQuery.tenantId = tenantId;

      milkQuery.tenantId = tenantId;

      medicalQuery.tenantId = tenantId;

      saleQuery.tenantId = tenantId;

      eventQuery.tenantId = tenantId;
    }


    /* -------------------------------------------------------
       GOAT FILTER
    ------------------------------------------------------- */

    if (goatId) {

      weightQuery.goatId = goatId;

      milkQuery.goatId = goatId;

      medicalQuery.goatId = goatId;

      saleQuery.goatId = goatId;

      eventQuery.goatId = goatId;
    }


    /* -------------------------------------------------------
       DATE FILTER
    ------------------------------------------------------- */

    if (startDate || endDate) {

      const start =
        startDate
          ? new Date(startDate)
          : null;

      const end =
        endDate
          ? new Date(endDate)
          : null;


      if (start) {

        start.setHours(
          0,
          0,
          0,
          0
        );

        weightQuery.recordedAt =
          {
            ...(weightQuery.recordedAt || {}),
            $gte: start,
          };

        milkQuery.recordDate =
          {
            ...(milkQuery.recordDate || {}),
            $gte: startDate,
          };

        medicalQuery.recordDate =
          {
            ...(medicalQuery.recordDate || {}),
            $gte: startDate,
          };

        saleQuery.saleDate =
          {
            ...(saleQuery.saleDate || {}),
            $gte: startDate,
          };

        eventQuery.eventDate =
          {
            ...(eventQuery.eventDate || {}),
            $gte: start,
          };
      }


      if (end) {

        end.setHours(
          23,
          59,
          59,
          999
        );

        weightQuery.recordedAt =
          {
            ...(weightQuery.recordedAt || {}),
            $lte: end,
          };

        milkQuery.recordDate =
          {
            ...(milkQuery.recordDate || {}),
            $lte: endDate,
          };

        medicalQuery.recordDate =
          {
            ...(medicalQuery.recordDate || {}),
            $lte: endDate,
          };

        saleQuery.saleDate =
          {
            ...(saleQuery.saleDate || {}),
            $lte: endDate,
          };

        eventQuery.eventDate =
          {
            ...(eventQuery.eventDate || {}),
            $lte: end,
          };
      }
    }


    /* -------------------------------------------------------
       FETCH DATA FROM MONGODB
    ------------------------------------------------------- */

    const [
      goats,
      weights,
      milkRecords,
      medicalRecords,
      sales,
      events,
    ] = await Promise.all([

      Goat.find(goatQuery)
        .sort({
          createdAt: -1,
        }),

      Weight.find(weightQuery)
        .sort({
          recordedAt: -1,
        }),

      MilkRecord.find(milkQuery)
        .sort({
          recordDate: -1,
        }),

      MedicalRecord.find(medicalQuery)
        .sort({
          recordDate: -1,
        }),

      Sale.find(saleQuery)
        .sort({
          saleDate: -1,
        }),

      Event.find(eventQuery)
        .sort({
          eventDate: -1,
        }),
    ]);


    /* =====================================================
       SUMMARY
    ===================================================== */

    const totalGoats =
      goats.length;


    const activeGoats =
      goats.filter(
        goat =>
          goat.status === 'Active'
      ).length;


    const soldGoats =
      goats.filter(
        goat =>
          goat.status === 'Sold'
      ).length;


    const totalWeightRecords =
      weights.length;


    const totalMilkRecords =
      milkRecords.length;


    const totalMedicalRecords =
      medicalRecords.length;


    const totalSales =
      sales.length;


    const totalEvents =
      events.length;


    /* =====================================================
       WEIGHT SUMMARY
    ===================================================== */

    const weightValues =
      weights.map(
        item =>
          Number(item.weight) || 0
      );


    const totalWeight =
      weightValues.reduce(
        (sum, value) =>
          sum + value,
        0
      );


    const averageWeight =
      weightValues.length
        ? Number(
            (
              totalWeight /
              weightValues.length
            ).toFixed(2)
          )
        : 0;


    const highestWeight =
      weightValues.length
        ? Math.max(...weightValues)
        : 0;


    const lowestWeight =
      weightValues.length
        ? Math.min(...weightValues)
        : 0;


    /* =====================================================
       MILK SUMMARY
    ===================================================== */

    const totalMorningMilk =
      milkRecords.reduce(
        (sum, record) =>
          sum +
          (Number(record.morningMilk) || 0),
        0
      );


    const totalEveningMilk =
      milkRecords.reduce(
        (sum, record) =>
          sum +
          (Number(record.eveningMilk) || 0),
        0
      );


    const totalMilk =
      milkRecords.reduce(
        (sum, record) =>
          sum +
          (Number(record.totalMilk) || 0),
        0
      );


    /* =====================================================
       SALES SUMMARY
    ===================================================== */

    const totalSalesAmount =
      sales.reduce(
        (sum, sale) =>
          sum +
          (Number(sale.salePrice) || 0),
        0
      );


    const totalAmountPaid =
      sales.reduce(
        (sum, sale) =>
          sum +
          (Number(sale.amountPaid) || 0),
        0
      );


    const pendingAmount =
      Math.max(
        totalSalesAmount -
        totalAmountPaid,
        0
      );


    /* =====================================================
       MEDICAL SUMMARY
    ===================================================== */

    const completedMedical =
      medicalRecords.filter(
        record =>
          record.status ===
          'Completed'
      ).length;


    const pendingMedical =
      medicalRecords.filter(
        record =>
          record.status ===
          'Pending'
      ).length;


    /* =====================================================
       RESPONSE
    ===================================================== */

    res.json({

      success: true,

      generatedAt:
        new Date().toISOString(),


      filters: {
        tenantId:
          tenantId || null,

        goatId:
          goatId || null,

        startDate:
          startDate || null,

        endDate:
          endDate || null,
      },


      summary: {

        totalGoats,

        activeGoats,

        soldGoats,

        totalWeightRecords,

        totalMilkRecords,

        totalMedicalRecords,

        totalSales,

        totalEvents,

      },


      weightSummary: {

        averageWeight,

        highestWeight,

        lowestWeight,

        totalWeightRecords,

      },


      milkSummary: {

        totalMorningMilk:
          Number(
            totalMorningMilk.toFixed(2)
          ),

        totalEveningMilk:
          Number(
            totalEveningMilk.toFixed(2)
          ),

        totalMilk:
          Number(
            totalMilk.toFixed(2)
          ),

      },


      medicalSummary: {

        total:
          totalMedicalRecords,

        completed:
          completedMedical,

        pending:
          pendingMedical,

      },


      salesSummary: {

        totalSales,

        totalSalesAmount,

        totalAmountPaid,

        pendingAmount,

      },


      data: {

        goats,

        weights,

        milkRecords,

        medicalRecords,

        sales,

        events,

      },

    });

  } catch (error) {

    console.error(
      'REPORT ERROR:',
      error
    );

    res.status(500).json({

      success: false,

      error:
        'Failed to generate report',

    });
  }
});


/* =========================================================
   GOAT-SPECIFIC REPORT
   GET /api/reports/goat/:goatId
========================================================= */

router.get(
  '/goat/:goatId',
  async (req, res) => {

    try {

      const goatId =
        req.params.goatId;


      const goat =
        await Goat.findById(
          goatId
        );


      if (!goat) {

        return res.status(404).json({

          error:
            'Goat not found',

        });
      }


      const [

        weights,

        milkRecords,

        medicalRecords,

        sales,

        events,

      ] = await Promise.all([

        Weight.find({
          goatId,
        }).sort({
          recordedAt: -1,
        }),

        MilkRecord.find({
          goatId,
        }).sort({
          recordDate: -1,
        }),

        MedicalRecord.find({
          goatId,
        }).sort({
          recordDate: -1,
        }),

        Sale.find({
          goatId,
        }).sort({
          saleDate: -1,
        }),

        Event.find({
          goatId,
        }).sort({
          eventDate: -1,
        }),

      ]);


      res.json({

        success: true,

        generatedAt:
          new Date().toISOString(),

        goat,

        weights,

        milkRecords,

        medicalRecords,

        sales,

        events,

      });

    } catch (error) {

      console.error(
        'GOAT REPORT ERROR:',
        error
      );

      res.status(500).json({

        error:
          'Failed to generate goat report',

      });
    }
  }
);


export default router;